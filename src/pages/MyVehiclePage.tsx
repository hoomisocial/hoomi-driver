import { ChevronLeft, Gauge, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMapbox } from "@/hooks/useMapbox";

const MyVehiclePage = () => {
  const navigate = useNavigate();

  useMapbox({ containerId: "vehicle-map", zoom: 14 });

  return (
    <div className="min-h-screen max-w-[430px] mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 bg-card">
        <button
          onClick={() => navigate("/account")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ChevronLeft size={22} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">My Vehicle</h1>
      </div>

      {/* Bike image */}
      <div className="w-full h-56 bg-muted overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop"
          alt="Electric Bike"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vehicle info card overlapping image */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Bike-Type-name</h2>
              <p className="text-muted-foreground text-sm mt-0.5">Electric Bike • 2024</p>
            </div>
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg">
              B 0000 XX
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
            <Gauge size={22} className="text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">Odometer</p>
          <p className="text-xl font-extrabold text-foreground">24.800 Km</p>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-3">
            <MapPin size={22} className="text-accent" />
          </div>
          <p className="text-muted-foreground text-sm">Total Trips</p>
          <p className="text-xl font-extrabold text-foreground">1.100</p>
        </div>
      </div>

      {/* Last location with map */}
      <div className="px-5 mt-4">
        <div className="rounded-2xl overflow-hidden border border-border">
          <div className="gradient-purple px-5 py-4">
            <p className="text-primary-foreground font-bold text-lg">Grand Indonesia</p>
            <p className="text-primary-foreground/70 text-sm">Today, 10:20 AM</p>
          </div>
          <div className="h-48 relative">
            <div id="vehicle-map" className="absolute inset-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVehiclePage;
