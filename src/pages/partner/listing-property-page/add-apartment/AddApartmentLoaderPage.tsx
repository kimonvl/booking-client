import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Sparkles } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectAddApartmentLoading } from "@/store/partner/manage-property/apartment/apartment.selector";

export default function AddApartmentLoaderPage() {
  const navigate = useNavigate();
  const addApartmentLoading = useAppSelector(selectAddApartmentLoading);

  useEffect(() => {
    if (!addApartmentLoading)
      navigate("/partner", { replace: true }); // partner group home (your index route)
  }, [addApartmentLoading]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      {/* local keyframes so you don't touch global css */}
      <style>
        {`
          @keyframes floaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
          @keyframes shine { 0% { background-position: 0% 50% } 100% { background-position: 100% 50% } }
          @keyframes bar { 0% { transform: translateX(-100%) } 100% { transform: translateX(220%) } }
          @keyframes dot { 0%, 100% { transform: translateY(0); opacity: .5 } 50% { transform: translateY(-6px); opacity: 1 } }
        `}
      </style>

      <div className="w-full max-w-[520px]">
        <div className="rounded-xl border bg-white shadow-sm p-8 relative overflow-hidden">
          {/* animated soft gradient */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              background:
                "linear-gradient(90deg, #0071c2, #7c3aed, #0071c2)",
              backgroundSize: "200% 200%",
              animation: "shine 2.8s linear infinite",
            }}
          />

          <div className="relative">
            {/* Logo-ish icon */}
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-xl bg-[#0071c2]/10 flex items-center justify-center"
                style={{ animation: "floaty 1.8s ease-in-out infinite" }}
              >
                <Building2 className="h-6 w-6 text-[#0071c2]" />
              </div>

              <div className="flex-1">
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  Preparing your partner dashboard
                </div>
                <div className="text-sm text-muted-foreground">
                  Setting things up… almost there
                </div>
              </div>

              <Sparkles className="h-5 w-5 text-[#0071c2]" />
            </div>

            {/* Ring + dots */}
            <div className="mt-8 flex items-center justify-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-[#0071c2]/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0071c2] animate-spin" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0071c2]" style={{ animation: "dot .9s ease-in-out infinite" }} />
              <span className="h-2 w-2 rounded-full bg-[#0071c2]" style={{ animation: "dot .9s .15s ease-in-out infinite" }} />
              <span className="h-2 w-2 rounded-full bg-[#0071c2]" style={{ animation: "dot .9s .3s ease-in-out infinite" }} />
            </div>

            {/* fake progress bar */}
            <div className="mt-8">
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full w-1/3 rounded-full bg-[#0071c2]"
                  style={{ animation: "bar 1.2s ease-in-out infinite" }}
                />
              </div>
              <div className="mt-3 text-xs text-muted-foreground text-center">
                Redirecting to your group home…
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          Tip: you can replace this later with real API loading status.
        </div>
      </div>
    </div>
  );
}
