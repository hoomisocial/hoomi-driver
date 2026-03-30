import { ChevronRight, Star, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuSections = [
  {
    items: [
      { label: "My Vehicle", value: "B XXXJBN" },
      { label: "Kits" },
      { label: "Settings" },
    ],
  },
  {
    items: [
      { label: "Help Center" },
      { label: "Term & conditions" },
      { label: "Privacy policy" },
      { label: "About" },
    ],
  },
];

const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-[430px] mx-auto pb-20">
      {/* Header */}
      <div className="gradient-purple-header px-5 pt-10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-secondary border-4 border-primary-foreground/30 flex items-center justify-center text-xl font-bold text-primary">
            RD
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">Roberto Doe</h1>
            <div className="flex items-center gap-1 mt-1 bg-primary-foreground/20 rounded-full px-2.5 py-0.5 w-fit">
              <Star size={14} className="text-accent fill-accent" />
              <span className="text-primary-foreground text-sm font-semibold">4.8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="px-5 mt-6 space-y-4">
        {menuSections.map((section, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
            {section.items.map((item, j) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between px-5 py-4 text-left active:bg-muted/50 transition-colors ${
                  j < section.items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="font-medium text-foreground">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.value && (
                    <span className="text-muted-foreground text-sm">{item.value}</span>
                  )}
                  <ChevronRight size={18} className="text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Log out */}
      <div className="px-5 mt-8">
        <button
          onClick={() => navigate("/permissions")}
          className="w-full gradient-purple text-primary-foreground font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
