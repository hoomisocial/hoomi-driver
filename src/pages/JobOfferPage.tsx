import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Circle, Crosshair, Bike } from "lucide-react";
import { useMapbox } from "@/hooks/useMapbox";

const JobOfferPage = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [sliderX, setSliderX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const maxSlide = 260;

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX - sliderX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const x = Math.max(0, Math.min(e.touches[0].clientX - startX.current, maxSlide));
    setSliderX(x);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (sliderX > maxSlide * 0.7) {
      setSliderX(maxSlide);
      setAccepted(true);
      setTimeout(() => navigate("/active-trip"), 1500);
    } else {
      setSliderX(0);
    }
  };

  return (
    <div className="min-h-screen max-w-[430px] mx-auto flex flex-col">
      {/* Map placeholder */}
      <div className="flex-1 relative bg-muted">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23999' stroke-width='.5' fill='none'/%3E%3C/svg%3E")`,
        }} />
        {/* Online badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 bg-success text-success-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
            Online
            <div className="w-5 h-5 rounded-full border-2 border-success-foreground flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-success-foreground" />
            </div>
          </div>
        </div>
        {/* Location button */}
        <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
          <Crosshair size={22} />
        </button>
      </div>

      {/* Bottom card */}
      <div className="bg-card rounded-t-3xl -mt-4 relative z-10 px-5 pt-5 pb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">2.4km Away</p>
            <p className="text-3xl font-extrabold text-foreground">Rp.18.000</p>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground mt-1 inline-block">
              Hoomi wallet
            </span>
          </div>
          <div className="w-14 h-14 rounded-full border-[3px] border-primary flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">00</span>
          </div>
        </div>

        {/* Route */}
        <div className="mt-5 p-4 rounded-2xl border border-border">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center">
                <MapPin size={16} className="text-success" />
              </div>
              <div className="w-0.5 h-6 border-l-2 border-dashed border-muted-foreground/30 my-1" />
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                <Circle size={14} className="text-destructive fill-destructive/20" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase">Pick Up</p>
              <p className="font-semibold text-foreground">Kuta Beach Gate 1</p>
              <div className="border-t border-border my-3" />
              <p className="text-xs text-muted-foreground uppercase">Drop Off</p>
              <p className="font-semibold text-foreground">Beachwalk Shoping Center</p>
            </div>
          </div>
        </div>

        {/* Slide to accept */}
        <div className="mt-5">
          <div
            ref={sliderRef}
            className={`relative h-16 rounded-2xl overflow-hidden transition-colors ${
              accepted ? "gradient-orange" : "gradient-purple"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {accepted ? "Accept" : "Slide to Accept"}
              </span>
              {!accepted && (
                <span className="ml-2 text-primary-foreground/60">›››</span>
              )}
            </div>
            {!accepted && (
              <div
                className="absolute top-1.5 left-1.5 w-[52px] h-[52px] rounded-xl bg-primary-foreground/20 flex items-center justify-center transition-transform"
                style={{ transform: `translateX(${sliderX}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Bike size={22} className="text-primary-foreground" />
              </div>
            )}
            {accepted && (
              <div className="absolute top-1.5 right-1.5 w-[52px] h-[52px] rounded-xl bg-accent-foreground/20 flex items-center justify-center">
                <Bike size={22} className="text-accent-foreground" />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full text-center text-muted-foreground font-medium mt-3 py-2"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default JobOfferPage;
