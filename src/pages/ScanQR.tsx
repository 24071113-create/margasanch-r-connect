import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";
import { getBusesAtStop } from "@/data/mockData";

const ScanQR = () => {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const stopName = "Main Bazaar";
  const stopCode = "102";
  const busesAtStop = getBusesAtStop(stopName);

  return (
    <div className="px-4 py-6 max-w-sm mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="text-xl font-bold mb-4">📷 Scan QR</h2>

      {!scanned ? (
        <div className="bg-muted rounded-2xl p-8 flex flex-col items-center gap-4 shadow-inner">
          <div className="w-32 h-32 bg-card rounded-xl border-4 border-dashed border-primary/30 flex items-center justify-center">
            <QrCode className="w-16 h-16 text-primary/50" />
          </div>
          <p className="text-muted-foreground text-sm text-center">Simulated QR scanner</p>
          <button onClick={() => setScanned(true)} className="py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold shadow-md">
            Simulate Scan
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/30">
            <p className="font-semibold text-secondary">✅ QR Scanned!</p>
            <p className="text-sm mt-1">Stop: {stopName} (Stop {stopCode})</p>
          </div>

          <h3 className="font-bold">Buses at this stop:</h3>
          {busesAtStop.map(bus => (
            <div key={bus.number} className="bg-card rounded-xl p-3 shadow border flex justify-between items-center">
              <div>
                <p className="font-bold">Bus {bus.number}</p>
                <p className="text-sm text-muted-foreground">ETA: {bus.eta} · {bus.crowd}</p>
              </div>
              <button onClick={() => navigate(`/live-map/${bus.number}`)} className="text-sm text-primary font-medium">
                Track →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScanQR;
