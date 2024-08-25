"use client";
import {
  History,
  LibraryBig,
  LogOut,
  Moon,
  Menu,
  NotebookPen,
  Palette,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { nameFallback } from "@/lib/helpers";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
  getLoggedInUser,
  logOutUser,
} from "@/lib/store/features/slices/userSlice";
import { toast } from "./ui/use-toast";

function Navbar() {
  const location = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const hideNav = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/verify-code",
    "/story/",
    "/get-premium",
    "/call",
    "/new-post",
    "/upload-video",
    "/add-story",
  ];
  const [unreadMessageCount, newNotifications] = [0, false];
  const { user, isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [logOutDialog, setLogOutDialog] = React.useState(false);

  function handleLogout() {
    dispatch(logOutUser())
      .then(({ payload }) => {
        if (payload.success) {
          router.push("/sign-in");
        } else {
          toast({
            title: "Error",
            description: payload.message || "Something went wrong!",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        if (!navigator.onLine) {
          toast({
            title: "No internet connection",
            description: "Looks like you have slow or no internet connection",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: err.message || "Something went wrong!",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        setLogOutDialog(false);
      });
  }

  // React.useEffect(() => {
  //   dispatch(getLoggedInUser());
  // }, [getLoggedInUser, dispatch]);

  return (
    <nav
      className={`xl:px-4 xl:py-6 p-3 sm:sticky fixed sm:top-0 left-0 sm:h-screen h-fit bottom-0 xl:col-span-2 sm:col-span-1 col-span-10 sm:min-h-[42rem] max-h-[55rem] z-10 w-full min-w-max block 
      ${hideNav
        .map((path) => {
          if (location.includes(path) || location.startsWith(path))
            return "hidden";
          else return "";
        })
        .join("")} ${
        location.includes("/messages/") ||
        location.includes("/following") ||
        location.includes("/followers") ||
        location.includes("/video") ||
        location === "/notifications"
          ? "max-sm:hidden"
          : ""
      }`}
    >
      <div className="sm:bg-stone-100 sm:dark:bg-stone-900 min-h-14 bg-stone-100/50 dark:bg-stone-900/50 backdrop-blur-sm blur-bg h-full w-full sm:rounded-3xl rounded-2xl xl:p-6 sm:px-2 sm:py-4 sm:w-fit xl:w-full flex flex-col items-center justify-between">
        <Link href="/" className="sm:inline hidden w-full" title="Sociial">
          <div className="text-2xl tracking-tighter font-extrabold flex flex-col items-center md:justify-start md:pt-0 justify-center gap-2 w-full px-2">
            <Image
              src="/logo.svg"
              alt=""
              width="50"
              height="50"
              className="pointer-events-none select-none"
              priority={true}
            />
            <span className="xl:inline hidden">Project Store</span>
          </div>
        </Link>
        <div className="flex sm:flex-col flex-row w-full md:items-start items-center sm:justify-start justify-evenly p-2 text-lg gap-4 h-fit">
          <Link
            href="/"
            className={` md:w-full w-fit flex items-center xl:justify-start justify-center xl:pl-4 sm:p-3 p-2 gap-3 rounded-2xl hover:ring-stone-600 dark:hover:ring-stone-400 transition-colors ${
              location === "/"
                ? "sm:bg-stone-200 sm:dark:bg-stone-800 sm:hover:ring-0"
                : "sm:hover:ring-2"
            }`}
            title="Projects"
          >
            <LibraryBig className="inline" />
            <span className="xl:inline hidden">Projects</span>
          </Link>
          <Link
            href="/collaborating"
            className={`md:w-full w-fit flex items-center xl:justify-start justify-center xl:pl-4 sm:p-3 p-2 gap-3 rounded-2xl hover:ring-stone-600 dark:hover:ring-stone-400 transition-colors ${
              location === "/collaborating"
                ? "sm:bg-stone-200 sm:dark:bg-stone-800 sm:hover:ring-0"
                : "sm:hover:ring-2"
            }`}
            title="Collaborating"
          >
            <NotebookPen className="inline" />
            <span className="xl:inline hidden">Collaborating</span>
          </Link>
          <Link
            href="/collaborations"
            className={`md:w-full w-fit flex items-center xl:justify-start justify-center xl:pl-4 sm:p-3 p-2 gap-3 rounded-2xl hover:ring-stone-600 dark:hover:ring-stone-400 transition-colors ${
              location === "/collaborations"
                ? "sm:bg-stone-200 sm:dark:bg-stone-800 sm:hover:ring-0"
                : "sm:hover:ring-2"
            }`}
            title="Collaborations"
          >
            <History className="inline" />
            <span className="xl:inline hidden">Collaborations</span>
          </Link>
          <Link
            href={`/${user.username}`}
            className={`md:w-full w-fit flex items-center xl:justify-start justify-center xl:pl-4 sm:p-3 p-2 gap-3 rounded-2xl hover:ring-stone-600 dark:hover:ring-stone-400 transition-colors ${
              location === `/${user.username}` && isLoggedIn
                ? "sm:bg-stone-200 sm:dark:bg-stone-800 sm:hover:ring-0"
                : "sm:hover:ring-2"
            }`}
            title="Profile"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={user.avatar}
                loading="eager"
                alt=""
                className="pointer-events-none select-none"
              />
              <AvatarFallback>{nameFallback(user.fullName)}</AvatarFallback>
            </Avatar>
            <span className="xl:inline hidden">Profile</span>
          </Link>
        </div>
        <div className="w-full text-center sm:flex hidden flex-col xl:items-start items-center gap-4 sm:p-1">
          <Menubar className="w-full bg-transparent border-transparent xl:justify-start justify-center">
            <MenubarMenu>
              <MenubarTrigger
                className="bg-tranparent xl:w-full w-fit ring-2 ring-stone-500 flex items-center xl:justify-start justify-center xl:pl-4 sm:p-3 p-2 gap-3 rounded-2xl hover:ring-stone-900 dark:hover:ring-stone-200"
                title="More"
              >
                <span className="text-center w-full xl:inline hidden">
                  More
                </span>
                <Menu className="xl:hidden inline" />
              </MenubarTrigger>
              <MenubarContent className="rounded-xl" align="center">
                <MenubarSub>
                  <MenubarSubTrigger className="py-2.5 rounded-lg pl-2.5">
                    {theme === "dark" && <Moon />}
                    {theme === "light" && <Sun />}
                    {theme === "system" && <Palette />}
                    &nbsp;&nbsp;Theme
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      className="py-2.5 rounded-lg pl-2.5"
                      onClick={() => setTheme("system")}
                    >
                      <Palette />
                      &nbsp;&nbsp;System
                    </MenubarItem>
                    <MenubarItem
                      className="py-2.5 rounded-lg pl-2.5"
                      onClick={() => setTheme("light")}
                    >
                      <Sun />
                      &nbsp;&nbsp;Light
                    </MenubarItem>
                    <MenubarItem
                      className="py-2.5 rounded-lg pl-2.5"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon />
                      &nbsp;&nbsp;Dark
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem
                  className="py-2.5 rounded-lg pl-2.5 text-red-600 focus:text-red-600"
                  onClick={() => setLogOutDialog(true)}
                >
                  <LogOut />
                  &nbsp;&nbsp;Log Out
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <AlertDialog open={logOutDialog} onOpenChange={setLogOutDialog}>
            <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
              <AlertDialogTitle className="w-full text-center text-2xl tracking-tight font-bold">
                Log Out
              </AlertDialogTitle>
              <p className="dark:text-stone-400">
                You can always log back in at any time. Are you sure you want to
                Log Out?
              </p>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
