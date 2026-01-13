import type { StepsType } from "./AddAppartmentPage";

interface StepsProgressBarProps {
    steps: StepsType[];
    stepsProgress: Record<StepsType, boolean>;
    activeStep: string;
}

export default function StepsProgressBar({steps, stepsProgress, activeStep}: StepsProgressBarProps) {
  return (
     <div className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Labels row */}
        <div className="pt-5 pb-3">
          {/* Progress segments row */}
          <div className="mt-3 flex items-center gap-3">
            {steps.map((s) => {
              const isActive = s === activeStep;
              const isDone = stepsProgress[s];
              return (
                <div key={`${s}-bar`} className="flex-1">
                  <div
                    className={[
                      "h-1 rounded-full",
                      isDone
                        ? "bg-green-500"
                        : isActive
                          ? "bg-[#0071c2]"
                          : "bg-gray-200",
                    ].join(" ")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
