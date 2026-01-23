import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// TODO: fix the navigate, navigate only if a city is given in the input field and add the search string in url
export default function SearchBarComponent() {
    const navigate = useNavigate();

    const [cityFilter, setCityFilter] = useState("");

    const search = () => {
        if (cityFilter.length > 0)
            navigate(`/search?city=${cityFilter}`);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pb-6">
            <div className="bg-yellow-400 p-1 rounded-lg flex flex-col md:flex-row gap-1">
                <Input
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                placeholder="Αθήνα" 
                className="text-black bg-white h-14" />
                <Input placeholder="Check-in — Check-out" className="text-black bg-white h-14" />
                <Input placeholder="2 ενήλικες · 1 δωμάτιο" className="text-black bg-white h-14" />
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
