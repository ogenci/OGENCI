import { Router, type IRouter } from "express";
import { z } from "zod";
import { supabase } from "../lib/supabase";
import { Resend } from "resend";
import { 
  addMinutes, 
  format, 
  parseISO, 
  startOfDay, 
  endOfDay, 
  isBefore, 
  isAfter,
  setHours,
  setMinutes
} from "date-fns";
import "dotenv/config";

const router: IRouter = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.string(),
  startTime: z.string().datetime(), // ISO string
});

// Hardcoded Schedule: Mon-Fri, 9am - 5pm GMT
const SCHEDULE = {
  startHour: 9,
  endHour: 17,
  slotDuration: 30, // minutes
};

router.get("/available-slots", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Date is required (YYYY-MM-DD)" });
    }

    const selectedDate = parseISO(date);
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);

    // Fetch existing bookings for this day
    const { data: existingBookings, error } = await supabase
      .from("bookings")
      .select("start_time, end_time")
      .gte("start_time", dayStart.toISOString())
      .lte("start_time", dayEnd.toISOString());

    if (error) {
      console.error("Supabase Error:", error);
      throw error;
    }

    // Generate all possible slots
    const slots = [];
    let currentSlot = setMinutes(setHours(selectedDate, SCHEDULE.startHour), 0);
    const workEnd = setMinutes(setHours(selectedDate, SCHEDULE.endHour), 0);

    const now = new Date();

    while (isBefore(currentSlot, workEnd)) {
      const slotEnd = addMinutes(currentSlot, SCHEDULE.slotDuration);
      const slotISO = currentSlot.toISOString();

      // Check if slot is in the past
      const isPast = isBefore(currentSlot, now);

      // Check if slot overlaps with existing bookings
      const isBooked = existingBookings?.some(b => {
        const bStart = parseISO(b.start_time);
        return currentSlot.getTime() === bStart.getTime();
      });

      if (!isPast && !isBooked) {
        slots.push({
          time: slotISO,
          label: format(currentSlot, "h:mm a"),
        });
      }

      currentSlot = slotEnd;
    }

    res.json({ slots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/book", async (req, res) => {
  try {
    const data = bookingSchema.parse(req.body);
    const startTime = parseISO(data.startTime);
    const endTime = addMinutes(startTime, SCHEDULE.slotDuration);

    // 1. Check if slot is still available
    const { data: existing } = await supabase
      .from("bookings")
      .select("id")
      .eq("start_time", data.startTime)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ error: "This time slot is already booked." });
    }

    // 2. Save to Supabase
    const { error: dbError } = await supabase.from("bookings").insert({
      client_name: data.name,
      client_email: data.email,
      service: data.service,
      start_time: data.startTime,
      end_time: endTime.toISOString(),
    });

    if (dbError) throw dbError;

    // 3. Send Confirmation Emails
    const formattedDate = format(startTime, "EEEE, MMMM do 'at' h:mm a");
    
    // To Agency
    await resend.emails.send({
      from: "OGENCI Bookings <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL || "ogencidigital@gmail.com",
      subject: `New Booking: ${data.name} - ${data.service}`,
      html: `
        <h2>New Booking Confirmed</h2>
        <p><strong>Client:</strong> ${data.name} (${data.email})</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Time:</strong> ${formattedDate} (GMT)</p>
      `,
    });

    // To Client
    await resend.emails.send({
      from: "OGENCI <onboarding@resend.dev>",
      to: data.email,
      subject: `Booking Confirmed: OGENCI Strategy Call`,
      html: `
        <h2>Your strategy call is confirmed!</h2>
        <p>Hi ${data.name},</p>
        <p>We've successfully booked your session for <strong>${formattedDate} (GMT)</strong>.</p>
        <p>We'll send you a meeting link shortly before the call.</p>
        <p>Looking forward to building with you!</p>
        <br />
        <p>Best regards,</p>
        <p>The OGENCI Team</p>
      `,
    });

    res.status(200).json({ message: "Booking confirmed successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
