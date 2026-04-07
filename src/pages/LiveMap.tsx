import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { buses } from "@/data/mockData";

const mapStops = ["Main Bazaar", "Station Rd", "College", "Market"];

const LiveMap = () => {
  const navigate = useNavigate();
  const { busNumber } = useParams();
  const bus = buses.find(b => b.number === Number(busNumber)) || buses[0];
  const [busPosition, setBusPosition] = useState(0);
  const [eta, setEta] = useState(bus.etaMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPosition(prev => (prev + 1) % mapStops.length);
      setEta(prev => Math.max(0, prev - 30));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setEta(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="px-4 py-6 max-w-sm mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="text-xl font-bold mb-4">🗺️ Live Tracking – Bus {bus.number}</h2>

      {/* Simulated Map */}
      <div className="bg-muted rounded-2xl p-6 relative overflow-hidden shadow-inner">
        {/* Route line */}
        <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-primary/30 -translate-x-1/2" />

        <div className="relative space-y-10">
          {mapStops.map((stop, i) => (
            <div key={stop} className="flex items-center gap-4 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold z-10 shadow-md ${
                i === busPosition ? "bg-primary text-primary-foreground scale-110" : "bg-card border-2 border-primary/30"
              }`}>
                {i === busPosition ? "🚌" : (i + 1)}
              </div>
              <div>
                <p className={`font-medium ${i === busPosition ? "text-primary" : "text-foreground"}`}>{stop}</p>
                {i === busPosition && <p className="text-xs text-secondary font-medium">Bus is here</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-card rounded-xl p-4 shadow-md border flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">ETA</p>
          <p className="text-2xl font-bold text-primary">{formatTime(eta)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Next Stop</p>
          <p className="font-semibold">{mapStops[(busPosition + 1) % mapStops.length]}</p>
        </div>
      </div>

      <button onClick={() => navigate("/")} className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-md">
        Back to Home
      </button>
    </div>
  );
};

export default LiveMap;
