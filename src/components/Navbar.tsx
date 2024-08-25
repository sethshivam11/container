"use client";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Equal, X } from "lucide-react";
import React from "react";
import { useAppSelector } from "@/lib/store/store";

function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter();
  const location = usePathname();

  return (
    <>
      nav
      {/* <nav
        className="flex flex-row justify-between items-center px-4 h-16  sticky top-0 z-20 
          border-b-2 border-gray-300 dark:border-gray-600  backdrop-blur bg-transparent"
      >
        <span className="flex gap-4 items-center">
          <Button
            size="icon"
            variant="secondary"
            className={`md:hidden dark:bg-zinc-900 ring-1 dark:ring-zinc-600 ring-zinc-100 ${
              location.includes("/bookroom") ? "hidden" : ""
            }`}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <X /> : <Equal />}
          </Button>
          <Link href="/" className="flex flex-row gap-2 items-center">
            <img src={"/"} alt="" className="w-10 object-contain" />
            <span>Project Store</span>
          </Link>
          <span
            className={
              location.includes("/bookroom")
                ? "absolute right-4 flex gap-4 items-center"
                : "hidden"
            }
          >
            <Button
              variant="destructive"
              onClick={() => {
                router.push("/");
                localStorage.removeItem(tokenKey);
                setUser({ ...user, _id: "" });
              }}
            >
              Logout
            </Button>
            <ModeToggle />
          </span>
        </span>
        <ul
          className={`${
            location.includes("/admin") ||
            location.includes("/bookroom")
              ? "hidden"
              : ""
          } flex gap-2`}
        >
          <li>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Vacant Rooms
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => router.push("/timetable")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Timetable
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => router.push("/teachersabsent")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Teachers Absent
            </Button>
          </li>
          <li>
            <Button
              onClick={() => router.push("/login")}
              className="hidden md:flex "
            >
              Login
            </Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
        <ul
          className={`${
            location.includes("/admin") ? "" : "hidden"
          } flex gap-2`}
        >
          <li>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/timetable")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Timetable
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/teachersabsent")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Teachers Absent
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/register")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Register Teacher
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/addroom")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Rooms
            </Button>
          </li>
          <li>
            <Button
              variant="destructive"
              onClick={() => {
                router.push("/");
                localStorage.removeItem(tokenKey);
                setUser({ ...user, _id: "" });
              }}
              className="hidden md:flex"
            >
              Logout
            </Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
      <ul
        className={`flex flex-col absolute transition-transform duration-300 z-10 border-b-2 border-gray-300 dark:border-gray-700 w-full " 
      ${openNav ? "-translate-y-0" : "-translate-y-64"} ${
          location.includes("/admin") ? "hidden" : ""
        }`}
      >
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Vacant Rooms
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/timetable");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Timetable
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/teachersabsent");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Teachers Absent
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/login");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600 text-green-500"
          >
            Login
          </Button>
        </li>
      </ul>
      <ul
        className={`flex flex-col absolute transition-transform duration-300 z-10 border-b-2 border-gray-300 dark:border-gray-700 w-full " 
      ${openNav ? "-translate-y-0" : "-translate-y-64"} ${
          location.includes("/admin") ? "" : "hidden"
        }`}
      >
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/admin/timetable");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Timetable
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/admin/teachersabsent");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Teachers Absent
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/admin/register");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Register Teacher
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/admin/addroom");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Rooms
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/");
              setOpenNav(!openNav);
              localStorage.removeItem(tokenKey);
              setUser({ ...user, _id: "" });
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600 text-red-500"
          >
            Logout
          </Button>
        </li>
      </ul> */}
    </>
  );
}

export default Navbar;
