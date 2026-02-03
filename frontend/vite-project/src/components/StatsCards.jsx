import { WandSparkles, ShieldCheck } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <div className="card bg-base-100 border-2 border-amber-300/20 hover:border-amber-300/40 ">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-r from-sky-500/40 to-purple-600/50 rounded-2xl">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <div className="badge badge-dash">Live</div>
          </div>
          <div className="text-4xl font-black mb-1">{activeSessionsCount}</div>
          <div className="text-sm opacity-60">Active Sessions</div>
        </div>
      </div>

      {/* Recent Count */}
      <div className="card bg-base-100 border-2  border-amber-300/20 hover:border-amber-300/40">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-gradient-to-r from-sky-500/40 to-purple-600/50 rounded-2xl">
              <WandSparkles className="w-7 h-7 " />
            </div>
          </div>
          <div className="text-4xl font-black mb-1">{recentSessionsCount}</div>
          <div className="text-sm opacity-60">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;