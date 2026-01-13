import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

export interface SliderItem {
    title: string;
    img: string;
    description?: string;
}

interface ImageSliderProps {
    sliderRef: React.Ref<HTMLDivElement>;
    sliderItems: SliderItem[];
    sliderCanRight: boolean;
    scrollSliderOneRight: () => void;
}

export default function ImageSlider({ sliderRef, sliderItems, sliderCanRight, scrollSliderOneRight }: ImageSliderProps) {
    return (
        <div className="relative mt-6">
            <div
                ref={sliderRef}
                className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth pr-12"
                style={{ scrollbarWidth: "none" }}
            >
                {sliderItems.map((it) => (
                    <Card
                        key={it.title}
                        className="min-w-[240px] max-w-[240px] border-0 shadow-none"
                        data-slide-item="true"
                    >
                        <CardContent className="p-0">
                            <div
                                className="h-32 rounded-xl overflow-hidden"
                                style={{
                                    backgroundImage: `url(${it.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            {
                                "description" in it ? <div className="pt-3">
                                    <div className="font-semibold text-base">{it.title}</div>
                                    <div className="text-sm text-muted-foreground">{it.description}</div>
                                </div> : <></>
                            }

                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={scrollSliderOneRight}
                    disabled={!sliderCanRight}
                    className={`h-11 w-11 rounded-full bg-white shadow-md ${!sliderCanRight ? "opacity-0 pointer-events-none" : ""
                        }`}
                    aria-label="Next"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
