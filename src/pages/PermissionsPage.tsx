import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Mic, User, Check, Circle } from "lucide-react";

interface Permission {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  required: boolean;
  granted: boolean;
}

const PermissionsPage = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "location",
      title: "Location Access",
      description: "To show nearby drivers and delivery tracking",
      icon: <MapPin size={24} />,
      required: true,
      granted: true,
    },
    {
      id: "microphone",
      title: "Microphone Access",
      description: "For voice commands with Hoomi Agent",
      icon: <Mic size={24} />,
      required: false,
      granted: false,
    },
    {
      id: "profile",
      title: "Profile Information",
      description: "Your name and contact details",
      icon: <User size={24} />,
      required: true,
      granted: true,
    },
  ]);

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: !p.granted } : p))
    );
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[430px] mx-auto">
      {/* Header */}
      <div className="gradient-purple-header px-6 pt-12 pb-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-card flex items-center justify-center mb-4 shadow-lg">
          <span className="text-primary font-extrabold text-3xl">H</span>
        </div>
        <h1 className="text-2xl font-bold text-primary-foreground">Hoomi Partner</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">Micro App</p>
      </div>

      {/* Permissions */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-4 px-5 pt-6 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Circle size={16} className="text-primary" />
          <h2 className="text-lg font-bold text-foreground">App Permissions</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-5 ml-6">
          This app needs the following permissions to work properly
        </p>

        <div className="space-y-3">
          {permissions.map((perm) => (
            <button
              key={perm.id}
              onClick={() => togglePermission(perm.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                perm.granted
                  ? "border-primary/30 bg-secondary/50"
                  : "border-border bg-card"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  perm.granted
                    ? "bg-secondary text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {perm.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{perm.title}</span>
                  {perm.required && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-primary">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{perm.description}</p>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  perm.granted
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/30"
                }`}
              >
                {perm.granted && <Check size={16} strokeWidth={3} />}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-muted/50">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By continuing, you agree to share the selected information with Hoomi
            Delivery. You can manage these permissions anytime in settings.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 bg-card max-w-[430px] mx-auto w-full">
        <button
          onClick={() => navigate("/earnings")}
          className="w-full gradient-purple text-primary-foreground font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Circle size={18} />
          Authorize & Continue
        </button>
      </div>
    </div>
  );
};

export default PermissionsPage;
