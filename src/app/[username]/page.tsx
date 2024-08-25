"use client";
import { Bookmark, Grid2X2, MoreHorizontal, Mail, QrCode } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameFallback } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import QRCode from "qrcode";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { getProfile } from "@/lib/store/features/slices/userSlice";
import Link from "next/link";

function Profile({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const dispatch = useAppDispatch();
  const { user, profile } = useAppSelector((state) => state.user);
  const baseUrl = process.env.NEXT_PUBLIC_LINK || "";
  const router = useRouter();
  const location = usePathname();
  const [QR, setQR] = React.useState("");
  const username = params.username;

  async function copyLink(username: string) {
    const link = `${baseUrl}/${username}`;
    await navigator.clipboard.writeText(link);
    toast({
      title: "Copied",
      description: "The link has been copied to your clipboard.",
    });
  }

  const generateQR = async (text: string) => {
    try {
      setQR(await QRCode.toDataURL(`${baseUrl}/${text}`));
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    // dispatch(getFollowings());
    if (username) dispatch(getProfile({ username }));
  }, [username]);

  const projects = [
    {
      title: "Project 1",
      description: "This is the first project",
      image:
        "http://res.cloudinary.com/dv3qbj0bn/image/upload/v1724558310/sociial/ei5dc5llcnbfp66a8wjj.jpg",
      endDate: "2024-10-08T18:35:53.000Z",
      active: true,
      admin: [
        {
          fullName: "John Doe",
          username: "johndoe",
          avatar:
            "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png",
        },
      ],
      _id: "66caabe7c4ac6c787df4cc42",
    },
    {
      title: "Project 1",
      description: "This is the first project",
      image:
        "http://res.cloudinary.com/dv3qbj0bn/image/upload/v1724558310/sociial/ei5dc5llcnbfp66a8wjj.jpg",
      endDate: "2024-10-08T18:35:53.000Z",
      active: true,
      admin: [
        {
          fullName: "John Doe",
          username: "johndoe",
          avatar:
            "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png",
        },
      ],
      _id: "66caabe7c4ac6c787df4cc42",
    },
    {
      title: "Project 1",
      description: "This is the first project",
      endDate: "2024-10-08T18:35:53.000Z",
      image:
        "http://res.cloudinary.com/dv3qbj0bn/image/upload/v1724558310/sociial/ei5dc5llcnbfp66a8wjj.jpg",
      active: true,
      admin: [
        {
          fullName: "John Doe",
          username: "johndoe",
          avatar:
            "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png",
        },
      ],
      _id: "66caabe7c4ac6c787df4cc42",
    },
  ];

  return (
    <>
      <div className="min-h-screen xl:col-span-8 sm:col-span-9 col-span-10 container py-2 max-md:px-16 max-sm:px-2">
        <div className="flex md:flex-row flex-col md:items-center items-start justify-evenly w-full">
          <div className="flex items-center justify-center max-sm:justify-start gap-6 mt-4 px-4 max-sm:w-full">
            <Avatar className="lg:w-[200px] sm:w-[150px] w-[100px] lg:h-[200px] sm:h-[150px] h-[100px]">
              <AvatarImage
                src="https://res.cloudinary.com/dv3qbj0bn/image/upload/v1723483837/sociial/settings/r5pvoicvcxtyhjkgqk8y.png"
                className="pointer-events-none select-none"
              />
              <AvatarFallback>{nameFallback(profile.fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center my-4">
              <p className="lg:text-4xl text-2xl tracking-tight font-extrabold w-full min-h-8">
                Akash Pathak
              </p>
              <div className="text-stone-500 lg:text-xl text-lg flex items-center justify-center">
                @akash
              </div>
              <div className="flex items-center justify-center gap-2 max-sm:gap-4 select-none">
                {profile.username === user.username ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => generateQR(profile.username)}
                      >
                        <QrCode />
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      hideCloseIcon
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <DialogTitle className="text-center text-2xl my-1">
                        QR Code
                      </DialogTitle>
                      <Image
                        src={QR}
                        alt="QR Code"
                        width="500"
                        height="500"
                        className="w-96 object-contain mx-auto"
                      />
                      <Button
                        onClick={(e) => {
                          const link = document.createElement("a");
                          link.href = QR;
                          link.download = `${profile.fullName} QR`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        Download
                      </Button>
                      <DialogClose>Cancel</DialogClose>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => router.push(`/messages/${profile._id}`)}
                  >
                    <Mail />
                  </Button>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <MoreHorizontal />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    hideCloseIcon
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <DialogClose
                      className="w-full md:px-20 py-1"
                      onClick={() => {
                        if (navigator) {
                          navigator
                            .share({
                              title: profile.fullName,
                              text: `See @${profile.username}'s profile on Sociial`,
                              url: `${baseUrl}/${profile.username}`,
                            })
                            .catch((err) => console.log(err));
                        } else {
                          toast({
                            title: "Share feature is not supported",
                            description:
                              "You can try copying the link and sharing it manually.",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      Share Profile
                    </DialogClose>
                    <DialogClose
                      className="w-full md:px-20 py-1"
                      onClick={() => copyLink(profile.username)}
                    >
                      Copy link
                    </DialogClose>
                    <DialogClose>Cancel</DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="lg:py-16 sm:py-10 py-4 text-center grid grid-cols-3 sm:gap-4 gap-3 md:w-1/3 w-full">
            <button className="flex flex-col items-center justify-center gap-2">
              <span className="block lg:text-xl text-lg">Projects</span>
              <span className="lg:text-2xl text-lg">0</span>
            </button>
            <button
              className="flex flex-col items-center justify-center gap-2"
              onClick={() => router.push(`/${profile.username}/followers`)}
            >
              <span className="block lg:text-xl text-lg">Collaborating</span>
              <span className="lg:text-2xl text-lg">3</span>
            </button>
            <button
              className="flex flex-col items-center justify-center gap-2"
              onClick={() => router.push(`/${profile.username}/following`)}
            >
              <span className="block lg:text-xl text-lg">Collaborations</span>
              <span className="lg:text-2xl text-lg">3</span>
            </button>
          </div>
        </div>
        <div className="sm:w-3/4 md:w-1/2 w-full lg:ml-36 md:ml-20 font-light text-left text-sm my-2 max-sm:px-6">
          {profile.bio}
        </div>
        <div className="flex items-center justify-evenly max-md:justify-around mt-8 sm:text-md text-sm">
          <button
            className={`flex items-center justify-center gap-2 relative after:rounded-sm sm:after:w-28 after:w-16 after:absolute after:top-8 after:border-stone-800 after:dark:border-stone-200 ${
              !location.includes("/saved") ? "after:border-2" : "after:border-0"
            }`}
            onClick={() => router.push(`/${profile.username}`)}
          >
            <Grid2X2
              strokeWidth={location === `/${profile.username}` ? "2.5" : "1"}
            />
            <span className="max-sm:hidden">Projects</span>
          </button>
          <button
            className={`flex items-center justify-center gap-2 relative after:rounded-sm sm:after:w-28 after:w-16 after:absolute after:top-8 after:border-stone-800 after:dark:border-stone-200 ${
              location.includes("/saved") ? "after:border-2" : "after:border-0"
            }`}
            onClick={() => router.push(`/${profile.username}/saved`)}
          >
            <Bookmark
              strokeWidth="1"
              fill={location.includes("/saved") ? "currentColor" : "none"}
            />
            <span className="max-sm:hidden">Collaborations</span>
          </button>
        </div>
        <hr className="my-2 md:w-10/12 w-full mx-auto bg-stone-500 border-2 rounded-sm" />
        <div className="mx-auto md:w-4/5 w-full sm:pb-6 pb-20 sm:pt-0 mt-6">
          <div className="flex items-center justify-start flex-wrap flex-row w-full">
            {projects.map((project, index) => (
              <Link
                href={`/post/${project._id}`}
                className="lg:w-1/4 w-1/3 p-1 aspect-square relative select-none"
                key={index}
              >
                <Image
                  src={project.image}
                  width="300"
                  height="300"
                  className="w-full h-full object-cover rounded-sm select-none pointer-events-none"
                  alt=""
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
