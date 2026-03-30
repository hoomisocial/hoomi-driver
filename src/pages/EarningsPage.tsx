import { useState } from "react";
import { Plus, ArrowDown, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const weeklyData = [
  { day: "Mo", value: 65 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 40 },
];

const recentActivity = [
  { id: 1, service: "Hoomibike", time: "Today, 10:20 AM", amount: "+ Rp 15.000" },
  { id: 2, service: "Hoomibike", time: "Today, 10:20 AM", amount: "+ Rp 15.000" },
  { id: 3, service: "Hoomibike", time: "Today, 10:20 AM", amount: "+ Rp 15.000" },
];

const EarningsPage = () => {
  const [tab, setTab] = useState<"today" | "weekly">("today");

  return (
    <div className="min-h-screen max-w-[430px] mx-auto pb-20">
      {/* Purple header */}
      <div className="gradient-purple-header px-5 pt-10 pb-8 rounded-b-[2rem]">
        {/* Tab switcher */}
        <div className="flex justify-center mb-6">
          <div className="bg-foreground/20 rounded-full p-1 flex">
            <button
              onClick={() => setTab("today")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === "today"
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70"
              }`}
            >
              Today's
            </button>
            <button
              onClick={() => setTab("weekly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === "weekly"
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70"
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        <p className="text-primary-foreground/70 text-center text-sm">
          {tab === "today" ? "Today's Earnings" : "Weekly Earnings"}
        </p>
        <p className="text-primary-foreground text-center text-3xl font-extrabold mt-1">
          Rp.000.000
        </p>

        {/* Stats */}
        <div className="flex gap-3 mt-5">
          <div className="flex-1 bg-primary-foreground/10 rounded-2xl p-4">
            <p className="text-primary-foreground/70 text-xs">Jobs done</p>
            <p className="text-primary-foreground text-2xl font-bold mt-1">8</p>
            <div className="mt-2 h-1 rounded-full bg-primary-foreground/20">
              <div className="h-full w-2/3 rounded-full bg-accent" />
            </div>
          </div>
          <div className="flex-1 bg-primary-foreground/10 rounded-2xl p-4">
            <p className="text-primary-foreground/70 text-xs">Hours Online</p>
            <p className="text-primary-foreground text-2xl font-bold mt-1">5</p>
            <div className="mt-2 h-1 rounded-full bg-primary-foreground/20">
              <div className="h-full w-1/2 rounded-full bg-accent" />
            </div>
          </div>
        </div>

        {/* Quick actions (today only) */}
        {tab === "today" && (
          <div className="mt-5 bg-primary-foreground/10 rounded-2xl p-4 flex justify-around">
            {[
              { icon: Plus, label: "Topup", color: "bg-accent text-accent-foreground" },
              { icon: ArrowDown, label: "Withdraw", color: "bg-accent text-accent-foreground" },
              { icon: Sparkles, label: "History", color: "bg-accent text-accent-foreground" },
            ].map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color}`}>
                  <action.icon size={18} />
                </div>
                <span className="text-primary-foreground text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content below header */}
      <div className="px-5 mt-6">
        {tab === "today" ? (
          <>
            <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Sparkles size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.service}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <span className="text-success font-semibold text-sm">{item.amount}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-foreground mb-4">Weekly History</h3>
            <div className="bg-card rounded-2xl border border-border p-4">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData} barCategoryGap="20%">
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "hsl(240 5% 46%)" }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                    {weeklyData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i === 4 ? "hsl(36 95% 55%)" : "hsl(240 5% 90%)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bonus card */}
            <div className="mt-5 gradient-purple rounded-2xl p-5">
              <p className="text-primary-foreground font-bold">
                Earn XX<br />more for Rp 50k bonus
              </p>
              <div className="mt-3 h-2 rounded-full bg-primary-foreground/20">
                <div className="h-full w-[58%] rounded-full bg-accent" />
              </div>
              <p className="text-primary-foreground/70 text-xs mt-2">70/120 Gems collected</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EarningsPage;
