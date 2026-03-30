import { useState } from "react";
import { ChevronRight, MapPin, Circle } from "lucide-react";

type JobTab = "open" | "current" | "past";

interface Job {
  id: string;
  name: string;
  avatar: string;
  pickup: string;
  dropoff: string;
  status?: string;
  statusColor?: string;
  online?: boolean;
}

const openJobs: Job[] = [
  {
    id: "1",
    name: "William Doe",
    avatar: "WD",
    pickup: "Kuta Beach Gate 1",
    dropoff: "Beachwalk Shoping Center",
    online: true,
  },
  {
    id: "2",
    name: "Rayna Bator",
    avatar: "RB",
    pickup: "Kuta Beach Gate 1",
    dropoff: "Beachwalk Shoping Center",
    online: true,
  },
];

const currentJobs: Job[] = [
  {
    id: "3",
    name: "William Doe",
    avatar: "WD",
    pickup: "Kuta Beach Gate 1",
    dropoff: "Beachwalk Shoping Center",
    status: "Heading to Pickup",
    statusColor: "bg-success/10 text-success",
  },
];

const pastJobs: Job[] = [
  {
    id: "4",
    name: "William Doe",
    avatar: "WD",
    pickup: "Kuta Beach Gate 1",
    dropoff: "Beachwalk Shoping Center",
    status: "Jobs Finish",
    statusColor: "bg-success/10 text-success",
  },
];

const JobCard = ({ job, showRoute = true, onClick }: { job: Job; showRoute?: boolean; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-card rounded-2xl border border-border p-4 text-left active:scale-[0.98] transition-transform"
    style={{
      background: "linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(265 70% 97%) 100%)",
    }}
  >
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-primary">
        {job.avatar}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">{job.name}</span>
          {job.online && <div className="w-2.5 h-2.5 rounded-full bg-success" />}
        </div>
        {job.status && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${job.statusColor}`}>
            {job.status}
          </span>
        )}
      </div>
      <ChevronRight size={20} className="text-muted-foreground" />
    </div>

    {showRoute && (
      <div className="mt-4 ml-1">
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
            <p className="text-xs text-muted-foreground">Pick up</p>
            <p className="font-semibold text-sm text-foreground">{job.pickup}</p>
            <div className="border-t border-dashed border-border my-3" />
            <p className="text-xs text-muted-foreground">Drop Off</p>
            <p className="font-semibold text-sm text-foreground">{job.dropoff}</p>
          </div>
        </div>
      </div>
    )}
  </button>
);

const JobsPage = () => {
  const [tab, setTab] = useState<JobTab>("open");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const tabConfig: { key: JobTab; label: string }[] = [
    { key: "open", label: "Open" },
    { key: "current", label: "Current" },
    { key: "past", label: "Past" },
  ];

  const jobs = tab === "open" ? openJobs : tab === "current" ? currentJobs : pastJobs;

  return (
    <div className="min-h-screen max-w-[430px] mx-auto pb-20">
      {/* Header */}
      <div className="gradient-purple-header px-5 pt-10 pb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-foreground">Find Jobs</h1>
          <button className="flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-semibold">
            Online
            <div className="w-5 h-5 rounded-full border-2 border-success-foreground flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-success-foreground" />
            </div>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-card">
        {tabConfig.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3 text-sm font-semibold relative transition-colors ${
              tab === t.key ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {t.label}
            {tab === t.key && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Job list */}
      <div className="px-5 mt-4 space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            showRoute={tab !== "past" || !!selectedJob}
            onClick={() => tab === "past" ? setSelectedJob(job) : undefined}
          />
        ))}
      </div>

      {/* Job Details Bottom Sheet */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setSelectedJob(null)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div
            className="relative w-full max-w-[430px] mx-auto bg-card rounded-t-3xl p-5 pb-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-extrabold text-foreground">Rp.18.000</h2>
              <span className="text-success font-bold text-sm border border-success rounded-full px-3 py-1">
                JOB FINISH
              </span>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
              Hoomi wallet
            </span>

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
                  <p className="text-xs text-muted-foreground">Pick up</p>
                  <p className="font-semibold text-foreground">{selectedJob.pickup}</p>
                  <div className="border-t border-border my-3" />
                  <p className="text-xs text-muted-foreground">Drop Off</p>
                  <p className="font-semibold text-foreground">{selectedJob.dropoff}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedJob(null)}
              className="w-full mt-5 py-4 rounded-2xl bg-secondary text-foreground font-bold text-lg active:scale-[0.98] transition-transform"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
