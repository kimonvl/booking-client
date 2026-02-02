import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  User as UserIcon,
  Briefcase,
  BadgeCheck,
  Wallet,
  Star,
  Heart,
  LogOut,
} from "lucide-react";
import { logoutStart } from "@/store/auth/authSlice";

function UserChip({ email }: { email: string }) {
  const initial = email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/10">
      <div className="h-11 w-11 rounded-full border-2 border-[#febb02] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-[#1f5aa6] flex items-center justify-center text-white font-bold">
          {initial}
        </div>
      </div>

      <div className="text-left leading-tight">
        <div className="text-sm font-semibold text-white">{email}</div>
        <div className="text-xs text-[#febb02] font-semibold">Genius Level 1</div>
      </div>
    </div>
  );
}

export function UserMenu({ email }: { email: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSignOut = () => {
    // Optional: also call your backend /auth/logout endpoint here via saga
    dispatch(logoutStart());
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="focus:outline-none">
          <UserChip email={email} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-72 p-2 rounded-xl"
      >
        <DropdownMenuItem
          className="gap-3 py-3 cursor-pointer"
          onClick={() => navigate("/account")}
        >
          <UserIcon className="h-5 w-5" />
          My account
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-3 py-3 cursor-pointer"
          onClick={() => navigate("/trips")}
        >
          <Briefcase className="h-5 w-5" />
          Bookings & Trips
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-3 py-3 cursor-pointer"
          onClick={() => navigate("/genius")}
        >
          <BadgeCheck className="h-5 w-5" />
          Genius loyalty program
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-3 py-3 cursor-pointer"
          onClick={() => navigate("/wallet")}
        >
          <Wallet className="h-5 w-5" />
          Rewards & Wallet
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-3 py-3 cursor-pointer"
          onClick={() => navigate("/reviews")}
        >
          <Star className="h-5 w-5" />
          Reviews
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-3 py-3 cursor-pointer"
          onClick={() => navigate("/saved")}
        >
          <Heart className="h-5 w-5" />
          Saved
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-3 py-3 cursor-pointer"
          onClick={onSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
