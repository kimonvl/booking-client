import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import HelpCard from "./HelpCard";
import { ThumbsUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectAmenitiesDictionary } from "@/store/dictionaries/dictionary.selector";

interface AmenitiesScreenProps {
    amenities: Record<string, boolean>;
    setAmenities: (value: Record<string, boolean>) => void;
}

export default function AmenitiesScreen({amenities, setAmenities}: AmenitiesScreenProps) {
  const groups = useAppSelector(selectAmenitiesDictionary);
  // const groups = [
  //     {
  //       title: "General",
  //       items: [
  //         "Air conditioning",
  //         "Heating",
  //         "Free WiFi",
  //         "Electric vehicle charging station",
  //       ],
  //     },
  //     {
  //       title: "Cooking and cleaning",
  //       items: ["Kitchen", "Kitchenette", "Washing machine"],
  //     },
  //     {
  //       title: "Entertainment",
  //       items: ["Flat-screen TV", "Swimming pool", "Hot tub", "Minibar", "Sauna"],
  //     },
  //     {
  //       title: "Outside and view",
  //       items: ["Balcony", "Garden view", "Terrace", "View"],
  //     },
  //   ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mt-1 mr-2">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a]">
            What can guests use at your place?
          </h1>

          <div className="mt-8">
            <Card className="rounded-md">
              <CardContent className="p-6">
                <div className="space-y-10">
                  {groups?.map((g) => (
                    <div key={g.code}>
                      <div className="text-lg font-semibold text-[#1a1a1a]">
                        {g.title}
                      </div>

                      <div className="mt-4 space-y-3">
                        {g.items.map((item) => (
                          <label
                            key={item.code}
                            className="flex items-center gap-3"
                          >
                            <Checkbox
                              checked={amenities[item.code]}
                              onCheckedChange={(v) =>
                                setAmenities({...amenities, [item.code]: v === true})
                              }
                            />
                            <span className="text-sm">{item.label}</span>
                          </label>
                        ))}
                      </div>

                      <div className="mt-8">
                        <Separator />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <HelpCard icon={<ThumbsUp className="h-5 w-5" />} title="Tip">
            <p>
              Add only what you really offer — amenities affect guest
              expectations and reviews.
            </p>
          </HelpCard>
        </div>
      </div>
    );
}
