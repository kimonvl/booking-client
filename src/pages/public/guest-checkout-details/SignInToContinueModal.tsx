import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    open: boolean;
    onBack: () => void;
};

export default function SignInToContinueModal({ open, onBack }: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Dialog open={open}>
            <DialogContent
                className="max-w-md"
                // prevent closing by clicking outside / ESC
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl">Sign in to continue</DialogTitle>
                    <DialogDescription>
                        You need to be signed in to enter your details and complete your reservation.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={onBack}>
                        Back
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(`/auth/guest/login?from=${encodeURIComponent(location.pathname + location.search)}`)
                        }
                    >
                        Sign in
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
