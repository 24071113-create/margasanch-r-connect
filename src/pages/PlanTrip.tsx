import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation } from "lucide-react";
import { stops, planTrip, type Bus } from "@/data/mockData";

const PlanTrip = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<Bus | null | undefined>(undefined);

  const handlePlan = () => {
    if (!from || !to || from === to) return;
    const best = planTrip(from, to);
    setResult(best);
  };

  return (
    <div className="px-4 py-6 max-w-sm mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="text-xl font-bold mb-6">🗺️ Plan a Trip</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-3 rounded-xl border bg-card text-card-foreground">
            <option value="">Select stop</option>
            {stops.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-3 rounded-xl border bg-card text-card-foreground">
            <option value="">Select stop</option>
            {stops.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button
          onClick={handlePlan}
          disabled={!from || !to || from === to}
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
        >
          <Navigation className="w-5 h-5" /> Plan Trip
        </button>
      </div>

      {result !== undefined && (
        <div className="mt-6 p-4 rounded-xl bg-card shadow-md border">
          {result ? (
            <>
              <p className="font-semibold text-secondary">✅ Best Option:</p>
              <p className="text-lg font-bold mt-1">Bus {result.number}</p>
              <p className="text-muted-foreground">ETA {result.eta} · Crowd: {result.crowd}</p>
            </>
          ) : (
            <p className="text-destructive font-medium">No direct bus found for this route.</p>
          )}
        </div>
      )}

      <button
        onClick={() => navigate("/buses")}
        className="w-full mt-4 py-3 border-2 border-primary text-primary rounded-xl font-semibold"
      >
        View All Buses
      </button>
    </div>
  );
};

export default PlanTrip;
