import quickinLogo from "./assets/quickin-logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center justify-center w-[60vw] max-w-[400px] rounded-full border border-white/30 bg-violet-200 py-0">
        <img
          src={quickinLogo}
          alt="Quickin logo"
          className="h-16 lg:h-20 w-auto scale-125 lg:scale-150 cursor-pointer object-contain"
          onClick={() => navigate("/")}
        />
      </div>
    </header>
  );
}