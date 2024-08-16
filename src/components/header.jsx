// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut, Sun, Moon } from "lucide-react";
import { UrlState } from "@/context";
import { BarLoader } from "react-spinners";
import { logout } from "@/db/apiAuthentication";
import useFetch from "@/useHooks/fetch";
import { useTheme } from "@/components/theme-provider"; // Import useTheme
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { theme, setTheme } = useTheme();
  const { loading, fn: LogoutFunction } = useFetch(logout);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="./logo.png" className="h-20" alt="logo" />
        </Link>

        <div className="sticky top-0">
          {/* Theme Toggle Button */}
          <Button onClick={toggleTheme} variant="ghost">
            {theme === "light" ? (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Light Mode
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-3 items-center">
          {!user ? (
            <Button onClick={() => navigate("/authenticate")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-8 h-8 p-0 rounded-full overflow-hidden"
                >
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata?.profile_images}
                      className="object-contain"
                    />
                    <AvatarFallback>WC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/homePage" className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    LogoutFunction().then(() => {
                      fetchUser();
                      navigate("/authenticate");
                    });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-5" width={"100%"} color="red" />}
    </>
  );
};

export default Header;
