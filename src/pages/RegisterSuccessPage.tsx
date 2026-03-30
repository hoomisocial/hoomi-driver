import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const RegisterSuccessPage = () => {
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    // Simulate approval after 4 seconds for demo
    const timer = setTimeout(() => {
      setApproved(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (approved) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [approved, navigate]);

  return (
    <div className="min-h-screen max-w-[430px] mx-auto gradient-purple flex flex-col items-start justify-center px-8 relative overflow-hidden">
      {/* Decorative grid squares */}
      {[
        "top-16 right-12 w-16 h-16",
        "top-32 right-32 w-10 h-10",
        "bottom-48 right-8 w-20 h-20",
        "bottom-24 left-16 w-12 h-12",
        "top-48 left-8 w-8 h-8",
        "bottom-64 right-28 w-14 h-14",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} rounded-lg bg-white/5`}
        />
      ))}

      {/* Logo / Check icon */}
      <div className="mb-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-[28px] gradient-orange flex items-center justify-center rotate-[-15deg] shadow-xl">
            <Check size={48} className="text-white rotate-[15deg]" strokeWidth={3} />
          </div>
          <div className="absolute -top-2 -left-3 w-28 h-28 rounded-[28px] bg-accent/20 rotate-[-25deg]" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-4xl font-extrabold text-primary-foreground leading-tight">
        You're all Set!
      </h1>
      <p className="text-primary-foreground/70 text-lg mt-2">
        your application has been approved.
      </p>

      {/* Loading */}
      <p className="text-primary-foreground/60 text-base mt-12">
        {approved ? "Redirecting..." : "Loading Dashboard"}
      </p>

      {/* Animated dots */}
      {!approved && (
        <div className="flex gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisterSuccessPage;
