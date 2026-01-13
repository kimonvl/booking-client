import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'

export default function SearchBarComponent() {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 pb-6">
            <div className="bg-yellow-400 p-1 rounded-lg flex flex-col md:flex-row gap-1">
                <Input placeholder="Αθήνα" className="text-black bg-white h-14" />
                <Input placeholder="Check-in — Check-out" className="text-black bg-white h-14" />
                <Input placeholder="2 ενήλικες · 1 δωμάτιο" className="text-black bg-white h-14" />
                <Button
                    className="h-14 bg-[#0071c2] text-white"
                    onClick={() => navigate("/search")}
                >
                    Αναζήτηση
                </Button>
            </div>
        </div>
    )
}
