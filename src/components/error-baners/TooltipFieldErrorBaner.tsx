type TooltipFieldErrorProps = {
  message?: string;
  className?: string;
};

export default function TooltipFieldErrorBaner({ message, className }: TooltipFieldErrorProps) {
  if (!message) return null;

  return (
    <div className={`relative inline-block ${className ?? ""}`} role="alert">
      <div className="relative rounded-md bg-red-600 px-3 py-2 text-sm text-white shadow-md">
        {message}
        {/* pointer */}
        <span className="absolute -top-2 left-5 h-0 w-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-red-600" />
      </div>
    </div>
  );
}