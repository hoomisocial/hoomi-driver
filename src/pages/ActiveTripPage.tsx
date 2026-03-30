import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Circle, MessageCircle, Phone, Crosshair } from "lucide-react";

type TripState = "heading_to_pickup" | "waiting" | "heading_to_dropoff";

interface TripData {
  passengerName: string;
  passengerAvatar: string;
  pickup: string;
  dropoff: string;
  distance: string;
  eta: string;
  paymentMethod: string;
}

const dummyTrip: TripData = {
  passengerName: "William Doe",
  passengerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  pickup: "Kuta Beach Gate 1",
  dropoff: "Beachwalk Shoping Center",
  distance: "10m away",
  eta: "4 mins",
  paymentMethod: "Hoomi wallet",
};

const stateConfig: Record<TripState, { label: string; dotColor: string; textColor: string }> = {
  heading_to_pickup: {
    label: "HEADING TO PICKUP",
    dotColor: "bg-success",
    textColor: "text-success",
  },
  waiting: {
    label: "WAITING FOR  WILLIAM",
    dotColor: "bg-accent",
    textColor: "text-accent",
  },
  heading_to_dropoff: {
    label: "HEADING TO DROP OFF",
    dotColor: "bg-primary",
    textColor: "text-primary",
  },
};

const ActiveTripPage = () => {
  const navigate = useNavigate();
  const [tripState, setTripState] = useState<TripState>("heading_to_pickup");
  const trip = dummyTrip;
  const config = stateConfig[tripState];

  const handleMainAction = () => {
    if (tripState === "heading_to_pickup") {
      setTripState("waiting");
    } else if (tripState === "waiting") {
      setTripState("heading_to_dropoff");
    } else {
      // Complete drop off → go back to home
      navigate("/home");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const mainButtonLabel =
    tripState === "heading_to_pickup"
      ? "I've Arrived"
      : tripState === "waiting"
      ? "Pick up"
      : "Complete Drop Off";

  const mapLabel = tripState === "heading_to_dropoff" ? "Drop Off" : "Pick Up";
  const mapLabelBg = tripState === "heading_to_dropoff" ? "bg-primary" : "bg-success";

  return (
    <div className="min-h-screen max-w-[430px] mx-auto flex flex-col">
      {/* Map area */}
      <div className="flex-1 relative bg-muted min-h-[45vh]">
        {/* Grid pattern placeholder for map */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23999' stroke-width='.5' fill='none'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Mapbox container - will be used when API key is provided */}
        <div id="trip-map" className="absolute inset-0" />

        {/* Online badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 bg-success text-success-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
            Online
            <div className="w-5 h-5 rounded-full border-2 border-success-foreground flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-success-foreground" />
            </div>
          </div>
        </div>

        {/* Map pin label */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <div className={`${mapLabelBg} text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md`}>
            {mapLabel}
          </div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-success mt-[-1px]" />
          <MapPin size={28} className="text-success mt-1" />
        </div>

        {/* Route line for heading to dropoff */}
        {tripState === "heading_to_dropoff" && (
          <div className="absolute top-[38%] left-1/2 w-1 h-[30%] bg-primary rounded-full z-[5]" />
        )}

        {/* Location button */}
        <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-card text-foreground flex items-center justify-center shadow-lg z-10">
          <Crosshair size={22} />
        </button>
      </div>

      {/* Bottom card */}
      <div className="bg-card rounded-t-3xl -mt-4 relative z-10 px-5 pt-5 pb-8">
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${config.dotColor}`} />
          <span className={`text-sm font-bold ${config.textColor} tracking-wide`}>
            {config.label}
          </span>
        </div>

        {/* Passenger info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={trip.passengerAvatar}
            alt={trip.passengerName}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-foreground">{trip.passengerName}</h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground mt-1 inline-block">
              {trip.paymentMethod}
            </span>
          </div>
          <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <MessageCircle size={20} className="text-primary" />
          </button>
          <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Phone size={20} className="text-primary" />
          </button>
        </div>

        {/* Route info */}
        <div className="p-4 rounded-2xl border border-border">
          {tripState === "heading_to_pickup" ? (
            /* Heading to pickup - show only pickup with distance */
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-success" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase">Pick up</p>
                <p className="font-bold text-foreground">{trip.pickup}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {trip.distance} ({trip.eta})
                </p>
              </div>
            </div>
          ) : (
            /* Waiting / Heading to dropoff - show pickup + dropoff */
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <MapPin size={18} className="text-success" />
                </div>
                <div className="w-0.5 h-6 border-l-2 border-dashed border-muted-foreground/30 my-1" />
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Circle size={16} className="text-destructive fill-destructive/20" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase">Pick Up</p>
                <p className="font-bold text-foreground">{trip.pickup}</p>
                <div className="border-t border-border my-3" />
                <p className="text-xs text-muted-foreground uppercase">Drop Off</p>
                <p className="font-bold text-foreground">{trip.dropoff}</p>
              </div>
            </div>
          )}
        </div>

        {/* Main action button */}
        <button
          onClick={handleMainAction}
          className="w-full mt-5 py-4 rounded-2xl gradient-purple text-primary-foreground font-bold text-lg active:scale-[0.98] transition-transform"
        >
          {mainButtonLabel}
        </button>

        {/* Cancel button - not shown during heading to dropoff */}
        {tripState !== "heading_to_dropoff" && (
          <button
            onClick={handleCancel}
            className="w-full text-center text-destructive font-semibold mt-3 py-2"
          >
            Cancel Trip
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveTripPage;
