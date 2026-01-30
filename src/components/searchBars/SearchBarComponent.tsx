import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import type { DateRange } from 'react-day-picker';
import DateRangePickerPopOver from './DatePickerPopOver';
import GuestCountPopOver from './GuestCountPopOver';
import { useAppSelector } from '@/store/hooks';
import { selectSearchPageCheckIn, selectSearchPageCheckout, selectSearchPageCity } from '@/store/guest/pages/search-page/searchPage.selector';
import { fromYmd, toYmd } from '@/store/guest/pages/search-page/searchPage.types';
import { toast } from 'sonner';

// TODO: fix the navigate, navigate only if a city is given in the input field and add the search string in url
export default function SearchBarComponent() {
    const navigate = useNavigate();
    const checkIn = useAppSelector(selectSearchPageCheckIn);
    const checkOut = useAppSelector(selectSearchPageCheckout);
    const city = useAppSelector(selectSearchPageCity);

    const initialRange = useMemo<DateRange>(() => {
        const from = checkIn ? fromYmd(checkIn) : undefined;
        const to = checkOut ? fromYmd(checkOut) : undefined;
        return { from, to };
    }, [checkIn, checkOut]);

    const [dates, setDates] = useState<DateRange | undefined>(initialRange);
    const [cityFilter, setCityFilter] = useState(city ?? "");
    const [open, setOpen] = useState(false);
    const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
    const [adultCount, setAdultCount] = useState(2);
    const [pets, setPets] = useState(false);

    const search = () => {
        if (cityFilter == null || cityFilter.trim() == "") {
            toast.error("Select a city to search");
            return;
        }
        const params = new URLSearchParams();
        params.set("city", cityFilter.trim());
        if (dates?.from) params.set("checkIn", toYmd(dates.from));
        if (dates?.to) params.set("checkOut", toYmd(dates.to));
        params.set("guests", String(adultCount));
        params.set("pets", String(pets));

        navigate(`/search?${params.toString()}`);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pb-6">
            <div className="bg-yellow-400 p-1 rounded-lg flex flex-col md:flex-row gap-1">
                <Input
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    placeholder="Αθήνα"
                    className="text-black bg-white h-14"
                />
                <div className="bg-white h-14 flex items-center rounded-md w-170">
                    <DateRangePickerPopOver value={dates} onChange={setDates} open={open} setOpen={setOpen} />
                </div>
                <div className="bg-white h-14 flex items-center rounded-md w-170">
                    <GuestCountPopOver
                        open={guestPopoverOpen}
                        setOpen={setGuestPopoverOpen}
                        adultCount={adultCount}
                        setAdultCount={setAdultCount}
                        pets={pets}
                        setPets={setPets}
                    />
                </div>
                <Button
                    className="h-14 bg-[#0071c2] text-white"
                    onClick={() => search()}
                >
                    Αναζήτηση
                </Button>
            </div>
        </div>
    )
}
