import { useEffect, useState } from "react"
import { Slider } from "../ui/slider"

interface SliderFilterProps {
  label: string
  limits: [number, number]                 // value from redux
  setLimits: (v: [number, number]) => void // dispatch to redux
}

export default function SliderFilter({ limits, setLimits, label }: SliderFilterProps) {
  const [draft, setDraft] = useState<[number, number]>(limits)

  // keep local state in sync if redux changes externally
  useEffect(() => {
    setDraft(limits)
  }, [limits])

  return (
    <div>
      <div className="font-semibold">{label}</div>

      <div className="text-sm text-muted-foreground mt-1">
        € {draft[0]} – € {draft[1]}+
      </div>

      <div className="mt-4">
        <Slider
          value={draft}
          min={0}
          max={500}
          step={5}
          onValueChange={(v) => setDraft([v[0], v[1]] as [number, number])}
          onValueCommit={(v) => setLimits([v[0], v[1]] as [number, number])}
        />
      </div>
    </div>
  )
}