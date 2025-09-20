import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Clock } from "lucide-react";
import { sendReminderLead } from "@/services/emailService";
import { useToast } from "@/hooks/use-toast";

const SUPPRESS_KEY = "stlp_reminder_suppressed_until";
const SUBMITTED_KEY = "stlp_reminder_submitted";

const getSuppressUntil = (): number => {
  const stored = localStorage.getItem(SUPPRESS_KEY);
  return stored ? Number(stored) : 0;
};

const setSuppressForDays = (days: number) => {
  const until = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(SUPPRESS_KEY, String(until));
};

const setSubmitted = () => localStorage.setItem(SUBMITTED_KEY, "true");
const isSubmitted = (): boolean => localStorage.getItem(SUBMITTED_KEY) === "true";

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const ReminderModal: React.FC = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remindDate = useMemo(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isSubmitted()) return; // never show again if previously submitted
    const suppressedUntil = getSuppressUntil();
    if (suppressedUntil && Date.now() < suppressedUntil) return; // currently suppressed

    const timer = setTimeout(() => setOpen(true), 15000); // 15 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (!isSubmitted()) {
      setSuppressForDays(7); // suppress for a week on dismiss
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      setSubmitting(true);
      const success = await sendReminderLead({
        email,
        remindOnISO: remindDate.toISOString(),
        sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
      });
      if (success) {
        setSubmitted();
        toast({
          title: "You're all set!",
          description: "We'll email you a quick reminder in about a week.",
        });
        setOpen(false);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : handleClose())}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-amber-50 to-background" />
          <div className="relative p-6 sm:p-8">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Bell className="w-5 h-5" />
                </div>
                <DialogTitle className="text-2xl font-serif">Only a handful of setups left this season! 👀</DialogTitle>
              </div>
              <DialogDescription className="mt-2">
                Save your spot now or get a 7-day reminder so you don’t miss out.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-email">Email</Label>
                <Input
                  id="reminder-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>We'll remind you around {remindDate.toLocaleDateString()}.</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1" disabled={submitting}>
                  {submitting ? "Saving..." : "Remind me"}
                </Button>
                <Button type="button" variant="outline" onClick={handleClose} disabled={submitting}>
                  Not now
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center">
                No spam. One reminder, then we leave you be.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderModal;


