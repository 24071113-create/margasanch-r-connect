import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info, MapPin } from "lucide-react";
import { buses, type Bus } from "@/data/mockData";

const crowdColor = (c: string) => c === "Low" ? "text-secondary" : c === "Medium" ? "text-transport-orange" : "text-transport-red";

const BusList = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Bus | null>(null);

  return (
    <div className="px-4 py-6 max-w-sm mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="text-xl font-bold mb-4">🚍 Available Buses</h2>

      <div className="space-y-3">
        {buses.map((bus) => (
          <div key={bus.number} className="bg-card rounded-xl p-4 shadow-md border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-bold">Bus {bus.number}</p>
                <p className="text-sm text-muted-foreground">ETA: {bus.eta}</p>
                <p className={`text-sm font-medium ${crowdColor(bus.crowd)}`}>Crowd: {bus.crowd}</p>
                <p className="text-xs text-muted-foreground mt-1">{bus.route.join(" → ")}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => setSelected(bus)} className="flex-1 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                <Info className="w-4 h-4" /> View Info
              </button>
              <button onClick={() => navigate(`/live-map/${bus.number}`)} className="flex-1 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4" /> Live Tracking
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Modal */}
      {selected && (
        <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-3">ℹ️ Bus {selected.number} Info</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Route:</span> {selected.route.join(" → ")}</p>
              <p><span className="font-medium">Current Position:</span> {selected.currentPosition}</p>
              <p><span className="font-medium">Next Stop:</span> {selected.nextStop}</p>
              <p><span className="font-medium">Crowd:</span> <span className={crowdColor(selected.crowd)}>{selected.crowd}</span></p>
            </div>
            <button onClick={() => setSelected(null)} className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusList;
