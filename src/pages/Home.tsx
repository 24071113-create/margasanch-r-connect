import { useNavigate } from "react-router-dom";
import { MapPin, QrCode, WifiOff } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Plan a Trip", icon: MapPin, path: "/plan-trip", color: "bg-primary" },
    { label: "Scan QR", icon: QrCode, path: "/scan-qr", color: "bg-secondary" },
    { label: "Go Offline", icon: WifiOff, path: "/offline", color: "bg-transport-orange" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
      <div className="transport-gradient rounded-2xl p-6 mb-8 w-full max-w-sm text-center shadow-lg">
        <h1 className="text-2xl font-bold text-primary-foreground leading-tight">
          🚍 MargaSanchār
        </h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Smart Public Transport</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        {actions.map((action) => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className={`${action.color} text-primary-foreground w-full py-5 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 shadow-md hover:opacity-90 transition-opacity active:scale-[0.98]`}
          >
            <action.icon className="w-6 h-6" />
            {action.label}
          </button>
        ))}
      </div>

      <p className="text-muted-foreground text-sm text-center mt-8 max-w-xs">
        Inclusive Mobility for Tier-2 & Tier-3 Cities
      </p>
    </div>
  );
};

export default Home;
