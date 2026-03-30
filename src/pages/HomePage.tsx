import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, RefreshCw } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [jobNotFound, setJobNotFound] = useState(false);

  const handleToggleOnline = () => {
    const next = !isOnline;
    setIsOnline(next);
    if (next) {
      // Simulate searching for jobs
      setJobNotFound(false);
      setTimeout(() => {
        setJobNotFound(true);
      }, 3000);
    } else {
      setJobNotFound(false);
    }
  };

  const handleTryAgain = () => {
    setJobNotFound(false);
    // Simulate searching again
    setTimeout(() => {
      // For demo: navigate to job offer after retry
      navigate("/job-offer");
    }, 2000);
  };

  return (
    <div className="min-h-screen max-w-[430px] mx-auto flex flex-col relative pb-20">
      {/* Map area - full screen */}
      <div className="flex-1 relative bg-muted min-h-screen">
        {/* Grid pattern placeholder for map */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23999' stroke-width='.5' fill='none'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Mapbox container */}
        <div id="home-map" className="absolute inset-0" />

        {/* Online/Offline toggle */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={handleToggleOnline}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-colors ${
              isOnline
                ? "bg-success text-success-foreground"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isOnline ? "border-success-foreground" : "border-muted-foreground"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-success-foreground" : "bg-muted-foreground"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Driver location marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/25 flex items-center justify-center">
                <Navigation size={18} className="text-primary fill-primary rotate-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Hoomi logo at bottom center */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary shadow-xl flex items-center justify-center">
            <span className="text-primary-foreground font-extrabold text-xl">H</span>
          </div>
        </div>

        {/* Job not found banner */}
        {jobNotFound && isOnline && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 w-[85%]">
            <div className="bg-card rounded-full px-5 py-3 shadow-lg flex items-center gap-3">
              <RefreshCw size={20} className="text-accent animate-spin" />
              <span className="text-foreground font-medium flex-1">Job not found...</span>
              <button
                onClick={handleTryAgain}
                className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-bold"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
