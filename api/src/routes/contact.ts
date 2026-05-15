import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { z } from "zod";
import "dotenv/config";

const router: IRouter = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  businessName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  services: z.array(z.string()).min(1),
});

router.post("/contact", async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);

    const emailResponse = await resend.emails.send({
      from: "OGENCI Form <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL || "ogencidigital@gmail.com",
      subject: `New Enquiry from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Business:</strong> ${data.businessName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Services:</strong> ${data.services.join(", ")}</p>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend Error:", emailResponse.error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    res.status(200).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
