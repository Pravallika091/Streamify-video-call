import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout.js";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./Themeselector.jsx";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation, isPending } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname?.startsWith("/chat");

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY SHOW IN CHAT PAGE */}
          {isChatPage && (
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-9 text-primary drop-shadow-lg" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Notifications button */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle hover:bg-base-300 transition duration-300">
                <BellIcon className="h-6 w-6 text-primary hover:text-secondary transition duration-300" />
              </button>
            </Link>

            {/* Theme selector */}
            <ThemeSelector />

            {/* User avatar */}
            <div className="avatar">
              <div className="w-10 rounded-full overflow-hidden ring-2 ring-primary/50">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>

            {/* Logout button */}
            <button
              className="btn btn-ghost btn-circle hover:bg-base-300 transition duration-300"
              onClick={handleLogout}
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <LogOutIcon className="h-6 w-6 text-error hover:text-secondary transition duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
