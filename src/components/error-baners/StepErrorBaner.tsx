type StepErrorBannerProps = {
  messages?: string[];
};

export const StepErrorBanner = ({ messages }: StepErrorBannerProps) => {
  if (!messages || messages.length === 0) return null;

  return (
    <div
      role="alert"
      className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800"
    >
      <div className="mb-2 font-medium">Fix the following:</div>
      <ul className="list-disc space-y-1 pl-5">
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
};