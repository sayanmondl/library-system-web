import React from "react";
import Image from "next/image";
import DeleteAccount from "../components/DeleteAccount";
import LogOut from "../components/LogOut";
import Link from "next/link";
import { Pencil, ChevronRight } from "lucide-react";

const ProfileCard = ({ data }: { data: { id: string; name: string; email: string } }) => {
  return (
    <div className="relative w-full border rounded-lg shadow-md overflow-hidden">
      <img className="absolute -z-10 opacity-50" src="/profile_bg.svg" alt="profile_bg" />
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h1 className="text-2xl xs:text-3xl">{data.name}</h1>
          <Link href="/profile/modify_name" className="text-blue-600 hover:text-blue-800">
            <button type="submit" className="button-black2 flex justify-center items-center gap-3">
              modify
              <Pencil className="size-5" />
            </button>
          </Link>
        </div>
        <p className="text-gray-600">{data.email}</p>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <Link href="/profile/issues" className="text-blue-600 hover:text-blue-800 text-sm">
            <div className="flex gap-4 overflow-x-auto pb-4">
              <Image
                src="/image_cover.jpg"
                width={80}
                height={160}
                alt="Book cover"
                className="border rounded-md"
              />
              <Image
                src="/image_cover2.jpg"
                width={80}
                height={160}
                alt="Book cover"
                className="border rounded-md"
              />
              <Image
                src="/image_cover.jpg"
                width={80}
                height={160}
                alt="Book cover"
                className="border rounded-md"
              />
              <Image
                src="/image_cover2.jpg"
                width={80}
                height={160}
                alt="Book cover"
                className="border rounded-md"
              />
            </div>
          </Link>
        </div>

        <div className="pt-8 space-y-4">
          <div className="flex flex-col items-center gap-2 sm:flex-row justify-between">
            <Link
              href="/profile/reset_password"
              className="flex border button-black3 justify-around items-center"
            >
              <span className="font-medium">update password</span>
              <ChevronRight className="size-5" />
            </Link>

            <Link
              href="/profile/change_email"
              className="flex border button-black3 justify-around items-center"
            >
              <span className="font-medium">update e-mail</span>
              <ChevronRight className="size-5" />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row justify-between">
            <LogOut />
            <DeleteAccount userId={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
