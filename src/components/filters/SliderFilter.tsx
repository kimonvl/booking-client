import type { Dispatch, SetStateAction } from 'react';
import { Slider } from '../ui/slider'

interface SliderFilterProps {
    label: string;
    limits: [number, number];
    setLimits: Dispatch<SetStateAction<[number, number]>>
}

export default function SliderFilter({ limits, setLimits, label }: SliderFilterProps) {
    return (
        <div>
            <div className="font-semibold">{label}</div>
            <div className="text-sm text-muted-foreground mt-1">
                € {limits[0]} – € {limits[1]}+
            </div>

            <div className="mt-4">
                <Slider
                    value={limits}
                    min={0}
                    max={500}
                    step={5}
                    onValueChange={(v) => setLimits([v[0], v[1]] as [number, number])}
                />
            </div>
        </div>
    )
}
