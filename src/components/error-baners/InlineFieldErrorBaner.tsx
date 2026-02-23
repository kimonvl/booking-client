type InlineFieldErrorProps = {
  message?: string;
};

export const InlineFieldErrorBaner = ({ message }: InlineFieldErrorProps) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mb-1 rounded-md border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700"
    >
      {message}
    </div>
  );
};