
interface CounterFilterProps {
    label?: string;
    count: number;
    setCount: (next: number) => void
}

export default function CounterFilter({count, setCount, label}: CounterFilterProps) {
    const clamp = (n: number) => Math.max(0, Math.min(20, n));

    return (
        <div className="flex items-center justify-between gap-4">
            {label && <div className="text-sm">{label}</div>}
            <div className="flex items-center border rounded-md overflow-hidden">
                <button
                    type="button"
                    onClick={() => setCount(clamp(count - 1))}
                    className="h-10 w-10 flex items-center justify-center hover:bg-muted"
                    aria-label="Decrease bedrooms"
                >
                    —
                </button>
                <div className="h-10 w-12 flex items-center justify-center text-sm tabular-nums">
                    {count}
                </div>
                <button
                    type="button"
                    onClick={() => setCount(clamp(count + 1))}
                    className="h-10 w-10 flex items-center justify-center hover:bg-muted text-blue-600"
                    aria-label="Increase bedrooms"
                >
                    +
                </button>
            </div>
        </div>
    )
}
