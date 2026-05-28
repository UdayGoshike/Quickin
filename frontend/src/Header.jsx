import quickinLogo from "./assets/quickin-logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center rounded-full border border-white/30 bg-white/70 px-40 py-3 shadow-[0_8px_30px_rgba(124,58,237,0.18)] backdrop-blur-xl">
        <div className="-ml-0">
          <img
            src={quickinLogo}
            alt="Quickin logo"
            className="h-14 scale-180 w-auto cursor-pointer object-contain mix-blend-multiply"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </header>
  );
}