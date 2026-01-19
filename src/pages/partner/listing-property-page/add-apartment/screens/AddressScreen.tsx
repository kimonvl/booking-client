import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HelpCard from "./HelpCard";
import { ThumbsUp } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCountryDictionary } from "@/store/dictionaries/dictionary.selector";
import type { AddressType } from "@/types/request/apartment/addApartmentRequest.types";

interface AddressScreenProps {
    address: AddressType;
    setAddress: Dispatch<SetStateAction<AddressType>>
}

export default function AddressScreen({ address, setAddress }: AddressScreenProps) {
    const countryDictionary = useAppSelector(selectCountryDictionary);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mr-2 mt-1">
            <div>
                <h1 className="text-4xl font-bold text-[#1a1a1a]">
                    Where is your property?
                </h1>

                {/* NOTE: user asked to NOT implement the map.
            We keep normal background like the rest (card form only). */}
                <div className="mt-8">
                    <Card className="rounded-md">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                                        Street name
                                    </div>
                                    <Input
                                        value={address.street}
                                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                        placeholder="Street name"
                                        className="h-10"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                                        Street number
                                    </div>
                                    <Input
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={address.streetNumber}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, "");
                                            setAddress({ ...address, streetNumber: digitsOnly });
                                        }}
                                        placeholder="Street number"
                                        className="h-10"
                                    />
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                                        Apartment or floor number (optional)
                                    </div>
                                    <Input
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={address.floorNumber}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, "");
                                            setAddress({ ...address, floorNumber: digitsOnly });
                                        }}
                                        placeholder="Street number"
                                        className="h-10"
                                    />
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                                        Country/region
                                    </div>
                                    <Select value={address.country} onValueChange={(value) => setAddress({ ...address, country: value })}>
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                countryDictionary && countryDictionary.length > 0 &&
                                                countryDictionary.map((country) => (
                                                    <SelectItem value={country.code}>{country.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                                            City
                                        </div>
                                        <Input
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            placeholder=""
                                            className="h-10"
                                        />
                                    </div>

                                    <div>
                                        <div className="text-sm font-semibold text-[#1a1a1a] mb-2">
                                            Post code / Zip code
                                        </div>
                                        <Input
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={address.postCode}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, "");
                                            setAddress({ ...address, postCode: digitsOnly });
                                        }}
                                        placeholder="Street number"
                                        className="h-10"
                                    />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-6">
                <HelpCard
                    icon={<ThumbsUp className="h-5 w-5" />}
                    title="Tip"
                >
                    <p>
                        Make sure your address is accurate — it helps guests find you and
                        improves the quality of your listing.
                    </p>
                </HelpCard>
            </div>
        </div>
    )
}
