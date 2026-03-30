import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Step = "phone" | "otp" | "details";

const RegisterStep1Page = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const formattedPhone = phone || "000 0000";

  const handlePhoneContinue = () => {
    if (phone.length >= 8) {
      setStep("otp");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every((d) => d !== "")) {
      setFullName("Jhon doe");
      setEmail("mail@domain.com");
      setStep("details");
    }
  };

  const handleDetailsNext = () => {
    if (fullName && email) {
      localStorage.setItem(
        "hoomi_registration",
        JSON.stringify({
          step1Complete: true,
          phone,
          fullName,
          email,
          licensePlate,
        })
      );
      navigate("/register/step-2");
    }
  };

  const otpFilled = otp.every((d) => d !== "");

  // Phone input step
  if (step === "phone") {
    return (
      <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
        <div className="flex-1 px-6 pt-16">
          <h1 className="text-3xl font-extrabold text-foreground">
            What's your number?
          </h1>
          <p className="text-muted-foreground mt-2">
            We'll send a code to verify your phone.
          </p>

          <div className="mt-10">
            <div className="flex items-center gap-3 pb-3 border-b-2 border-primary">
              <span className="text-2xl font-bold text-foreground">+62</span>
              <span className="text-muted-foreground text-xl">|</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 13))
                }
                placeholder="81926642345"
                className="flex-1 text-2xl bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 font-medium"
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={handlePhoneContinue}
            disabled={phone.length < 8}
            className={`w-full font-bold text-lg py-4 rounded-2xl transition-all ${
              phone.length >= 8
                ? "gradient-purple text-primary-foreground active:scale-[0.98]"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // OTP step
  if (step === "otp") {
    return (
      <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
        <div className="flex-1 px-6 pt-16">
          <h1 className="text-3xl font-extrabold text-foreground">
            Enter verification code
          </h1>
          <p className="text-muted-foreground mt-2">
            Sent to +62 {formattedPhone}
          </p>

          <div className="mt-10 flex gap-4 justify-start">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className={`w-[72px] h-[72px] text-center text-2xl font-bold rounded-2xl border-2 outline-none transition-all bg-secondary/30 ${
                  digit
                    ? "border-primary text-foreground"
                    : "border-border text-muted-foreground"
                }`}
                autoFocus={i === 0}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={handleVerify}
            disabled={!otpFilled}
            className={`w-full font-bold text-lg py-4 rounded-2xl transition-all ${
              otpFilled
                ? "gradient-purple text-primary-foreground active:scale-[0.98]"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Verify
          </button>
        </div>
      </div>
    );
  }

  // Personal details step
  return (
    <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
      <div className="flex-1 px-6 pt-16">
        <h1 className="text-3xl font-extrabold text-foreground">
          Personal Details
        </h1>
        <p className="text-muted-foreground mt-2">
          Please check your data before continue.
        </p>

        <div className="mt-10 space-y-6">
          {/* Full Name */}
          <div>
            <label className="text-sm font-semibold text-foreground">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-2 pb-3 text-foreground text-lg bg-transparent border-b border-border outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Phone number (read-only) */}
          <div>
            <label className="text-sm font-semibold text-foreground">
              Phone number
            </label>
            <div className="mt-2 pb-3 border-b border-border flex items-center gap-2">
              <span className="text-lg text-foreground font-medium">+62</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-lg text-foreground">{phone}</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 pb-3 text-foreground text-lg bg-transparent border-b border-border outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Vehicle License Plate */}
          <div>
            <label className="text-sm font-semibold text-foreground">
              Vehicle License Plate
            </label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="e.g. DK 500 BE"
              className="w-full mt-2 pb-3 text-foreground text-lg bg-transparent border-b border-border outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={handleDetailsNext}
          disabled={!fullName || !email}
          className={`w-full font-bold text-lg py-4 rounded-2xl transition-all ${
            fullName && email
              ? "gradient-purple text-primary-foreground active:scale-[0.98]"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisterStep1Page;
