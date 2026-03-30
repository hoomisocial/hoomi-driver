import { useLocation, useNavigate } from "react-router-dom";
import { Bike, Navigation, MessageCircle, User } from "lucide-react";

const tabs = [
  { path: "/earnings", icon: Bike, label: "Earnings" },
  { path: "/home", icon: Navigation, label: "Jobs" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
  { path: "/account", icon: User, label: "Account" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on certain pages
  if (["/permissions", "/job-offer", "/active-trip", "/my-vehicle"].includes(location.pathname) || location.pathname.startsWith("/register")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="max-w-[430px] mx-auto flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
