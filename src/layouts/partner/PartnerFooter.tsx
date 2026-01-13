import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const BRAND_BLUE = "#003580";

export default function PartnerFooter() {
    return (
        <footer style={{ backgroundColor: BRAND_BLUE }} className="text-white">
            <div className="max-w-[1400px] mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex items-center gap-6 text-sm">
                        <button className="hover:underline">About Us</button>
                        <button className="hover:underline">Privacy and Cookie Statements</button>
                        <button className="hover:underline">FAQs</button>
                    </div>

                    <div className="flex gap-3">
                        <Button className="bg-[#0a66c2] hover:bg-[#095aa9]">
                            Add new property
                        </Button>
                        <Button className="bg-[#0a66c2] hover:bg-[#095aa9]">
                            Share your feedback
                        </Button>
                    </div>
                </div>

                <Separator className="my-8 bg-white/15" />

                <div className="text-sm opacity-90">
                    © Copyright <span className="underline">Booking.com</span> 2025
                </div>
            </div>
        </footer>
    )
}
