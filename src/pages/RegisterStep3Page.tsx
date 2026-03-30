import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, CheckCircle2 } from "lucide-react";

type View = "instruction" | "capture" | "confirm";

const RegisterStep3Page = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>("instruction");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = () => {
    setCapturedImage(
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    );
    setCurrentView("confirm");
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setCurrentView("capture");
  };

  const handleConfirm = () => {
    localStorage.setItem(
      "hoomi_registration",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("hoomi_registration") || "{}"),
        step3Complete: true,
      })
    );
    navigate("/register/success");
  };

  // Capture view
  if (currentView === "capture") {
    return (
      <div className="min-h-screen max-w-[430px] mx-auto bg-[hsl(0,0%,35%)] flex flex-col relative">
        <div className="flex-1 flex items-center justify-center relative">
          {/* Oval face guide */}
          <div className="w-56 h-72 rounded-[50%] border-2 border-white/60" />
          <div className="absolute text-white/60 text-3xl">+</div>
        </div>

        <div className="pb-8 pt-4 flex justify-center bg-card">
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center shadow-lg border-4 border-white"
          >
            <Camera size={24} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  }

  // Confirm view
  if (currentView === "confirm" && capturedImage) {
    return (
      <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button
            onClick={handleRetake}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronLeft size={22} className="text-foreground" />
          </button>
        </div>

        <div className="px-6">
          <h1 className="text-3xl font-extrabold text-foreground">
            Profile Picture
          </h1>
          <p className="text-muted-foreground mt-2">
            Make sure photos are clear and readable.
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 mt-8">
          <img
            src={capturedImage}
            alt="Captured selfie"
            className="w-64 h-64 rounded-2xl object-cover border border-border shadow-sm"
          />
        </div>

        <div className="px-6 pb-8 space-y-3 mt-auto pt-6">
          <button
            onClick={handleConfirm}
            className="w-full gradient-purple text-primary-foreground font-bold text-lg py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Confirm
          </button>
          <button
            onClick={handleRetake}
            className="w-full bg-secondary text-primary font-bold text-lg py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Retake Picture
          </button>
        </div>
      </div>
    );
  }

  // Instruction view (default)
  return (
    <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => navigate("/register/step-2")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ChevronLeft size={22} className="text-foreground" />
        </button>
      </div>

      <div className="px-6">
        <h1 className="text-3xl font-extrabold text-foreground">
          Profile Picture
        </h1>
        <p className="text-muted-foreground mt-2">
          Make sure photos are clear and readable.
        </p>
      </div>

      <div className="px-6 mt-8 flex-1">
        {/* Selfie preview placeholder */}
        <div className="flex justify-center">
          <div className="w-64 h-72 rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
              alt="Profile example"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 rounded-2xl border border-border p-5 space-y-3">
          {[
            "Please show your face",
            "Face forward to camera",
            "Use a photo with proper lighting",
          ].map((tip, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2
                size={20}
                className="text-accent shrink-0"
              />
              <span className="text-muted-foreground text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4">
        <button
          onClick={() => setCurrentView("capture")}
          className="w-full gradient-purple text-primary-foreground font-bold text-lg py-4 rounded-2xl active:scale-[0.98] transition-transform"
        >
          Take Picture
        </button>
      </div>
    </div>
  );
};

export default RegisterStep3Page;
