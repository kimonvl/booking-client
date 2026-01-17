import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import HelpCard from "./HelpCard";
import { ChevronDown, ThumbsUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectLanguageDictionary } from "@/store/dictionaries/dictionary.selector";

interface LanguagesScreenProps {
    languages: Record<string, boolean>;
    setLanguages: (value: Record<string, boolean>) => void;
    additionalLanguages: Record<string, boolean>;
    setAdditionalLanguages: (value: Record<string, boolean>) => void;
}

export default function LanguagesScreen({ languages, setLanguages, additionalLanguages, setAdditionalLanguages }: LanguagesScreenProps) {
    const allLanguages = useAppSelector(selectLanguageDictionary);
    const selectedAdditionalLanguages = allLanguages
    .filter((lang) => additionalLanguages[lang.code])
    .map((lang) => lang.label);
    const selectedAdditionalLanguagesLabel =
        selectedAdditionalLanguages.length > 0 ? selectedAdditionalLanguages.join(", ") : "Select languages";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 min-h-full ml-2 mr-2 mt-1">
            <div>
                <h1 className="text-4xl font-bold text-[#1a1a1a]">
                    What languages do you or your staff speak?
                </h1>

                <div className="mt-8">
                    <Card className="rounded-md">
                        <CardContent className="p-6">
                            <div className="text-sm font-semibold text-[#1a1a1a]">
                                Select languages
                            </div>

                            <div className="mt-4 space-y-3">
                                {allLanguages.map((lang) => {
                                    if (!(lang.code in languages)) return null;
                                    return (
                                        <label key={lang.code} className="flex items-center gap-3">
                                            <Checkbox
                                                checked={languages[lang.code]}
                                                onCheckedChange={(v) =>
                                                    setLanguages({ ...languages, [lang.code]: v === true })
                                                }
                                            />
                                            <span className="text-sm">{lang.label}</span>
                                        </label>
                                    )
                                })}
                            </div>

                            <Separator className="my-8" />

                            <div className="text-lg font-semibold text-[#1a1a1a]">Add additional languages</div>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className="mt-3 w-full h-12 px-4 flex items-center justify-between rounded-md border bg-white text-left text-sm"
                                    >
                                        <span className="line-clamp-2 pr-3 text-[#1a1a1a]">
                                            {selectedAdditionalLanguagesLabel}
                                        </span>
                                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[640px] max-w-[calc(100vw-32px)] p-0" align="start">
                                    <ScrollArea className="h-[280px] p-4">
                                        <div className="space-y-3">
                                            {allLanguages.map((lang) => {
                                                if (!(lang.code in additionalLanguages)) return null;
                                                return (
                                                    <label key={lang.code} className="flex items-center gap-3">
                                                        <Checkbox
                                                            checked={additionalLanguages[lang.code]}
                                                            onCheckedChange={(v) => setAdditionalLanguages({ ...additionalLanguages, [lang.code]: v === true })}
                                                        />
                                                        <span className="text-sm">{lang.label}</span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>

                            <div
                                aria-hidden
                                className={[
                                    "transition-[height] duration-200",
                                    "h-[250px]",
                                ].join(" ")}
                            />

                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-6">
                <HelpCard icon={<ThumbsUp className="h-5 w-5" />} title="Tip">
                    <p>
                        Guests feel more confident booking when they know they can
                        communicate easily.
                    </p>
                </HelpCard>
            </div>
        </div>
    );
}
