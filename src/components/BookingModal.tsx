import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, isSameDay, isBefore, startOfToday, parseISO } from "date-fns";
import * as Dialog from "@radix-ui/react-dialog";

interface Slot {
  time: string;
  label: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Strategy Call",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate);
      setSelectedSlot(null);
    }
  }, [selectedDate]);

  const fetchSlots = async (date: Date) => {
    setIsLoadingSlots(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(`/api/available-slots?date=${formattedDate}`);
      const data = await response.json();
      setSlots(data.slots || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startTime: selectedSlot.time,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setIsSuccess(false);
    setFormData({ name: "", email: "", service: "Strategy Call" });
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-background border border-border rounded-3xl overflow-hidden shadow-2xl z-[101] focus:outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            
            {/* Left Sidebar - Info */}
            <div className="lg:col-span-4 bg-muted/30 p-10 border-r border-border flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-12">Booking · Strategy Call</div>
                <h2 className="text-4xl font-display font-bold leading-tight mb-6">Let's map your global <em className="italic font-normal text-primary">growth</em>.</h2>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground leading-relaxed mb-8">
                  30-minute discovery call to audit your digital infrastructure and plan your ROI architecture.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" /> 30 Minutes
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <CalendarIcon className="w-4 h-4 text-primary" /> Video Call
                  </div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                OGENCI Digital · Global ROI Architecture
              </div>
            </div>

            {/* Right Side - Interactive */}
            <div className="lg:col-span-8 p-10 relative overflow-y-auto max-h-[90vh]">
              <Dialog.Close className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">You're booked!</h3>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground max-w-xs mb-10">
                      Check your email for confirmation and calendar invite. See you soon!
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-10 py-4 bg-foreground text-background rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-end">
                      <h3 className="text-xl font-display font-bold">Select Date & Time</h3>
                      <span className="text-[10px] font-mono text-muted-foreground">Step 1 of 2</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="calendar-container">
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={{ before: startOfToday() }}
                          modifiers={{ booked: [] }}
                          classNames={{
                            months: "flex flex-col",
                            month: "space-y-4",
                            caption: "flex justify-between items-center px-2",
                            caption_label: "text-[12px] font-mono uppercase tracking-widest font-bold",
                            nav: "flex items-center gap-1",
                            nav_button: "p-1 rounded-full hover:bg-muted transition-colors",
                            table: "w-full border-collapse",
                            head_row: "flex",
                            head_cell: "text-muted-foreground w-9 font-mono font-normal text-[10px] uppercase",
                            row: "flex w-full mt-2",
                            cell: "h-9 w-9 text-center text-sm p-0 relative",
                            day: "h-9 w-9 p-0 font-mono text-[11px] font-bold hover:bg-primary/20 rounded-full transition-all aria-selected:bg-primary aria-selected:text-background",
                            day_today: "border border-primary text-primary",
                            day_outside: "opacity-30",
                            day_disabled: "opacity-10 cursor-not-allowed",
                          }}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4">
                          <Clock className="w-3 h-3" /> Available Slots (GMT)
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                          {!selectedDate ? (
                            <div className="col-span-2 text-[10px] font-mono uppercase text-muted-foreground/40 italic py-12 text-center border border-dashed border-border rounded-xl">
                              Pick a date first
                            </div>
                          ) : isLoadingSlots ? (
                            <div className="col-span-2 flex items-center justify-center py-12">
                              <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                          ) : slots.length === 0 ? (
                            <div className="col-span-2 text-[10px] font-mono uppercase text-muted-foreground/40 italic py-12 text-center border border-dashed border-border rounded-xl">
                              No slots available
                            </div>
                          ) : (
                            slots.map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => setSelectedSlot(slot)}
                                className={`px-4 py-3 rounded-xl text-[10px] font-mono font-bold border transition-all ${
                                  selectedSlot?.time === slot.time
                                    ? "bg-primary text-background border-primary shadow-lg scale-105"
                                    : "bg-background text-foreground border-border hover:border-primary"
                                }`}
                              >
                                {slot.label}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-8">
                      <button
                        disabled={!selectedSlot}
                        onClick={() => setStep(2)}
                        className="px-8 py-4 bg-foreground text-background rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                      >
                        Next Step <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-muted transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-display font-bold">Your Details</h3>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">Step 2 of 2</span>
                    </div>

                    <div className="bg-muted/30 p-6 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold uppercase tracking-widest">{format(selectedDate!, "MMMM do, yyyy")}</div>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase">{selectedSlot?.label} (GMT)</div>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">Full Name</label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-background border border-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">Email Address</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@company.com"
                            className="w-full bg-background border border-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-primary text-background rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Confirming...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
