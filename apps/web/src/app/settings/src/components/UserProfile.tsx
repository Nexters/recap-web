"use client";

import Image from "next/image";
import { catchAPIError } from "@recap/api";
import { useQuery } from "@tanstack/react-query";

import { authWithTokenAPIService } from "@/app/(auth)/src/service";
import { userAPIService } from "@/app/settings/src/service";
import RightIcon from "@/assets/icons/arrow-right.svg";
import MailIcon from "@/assets/icons/mail.svg";
import DefaultImg from "@/assets/img/recap-1.png";

const UserProfile = () => {
  const { data } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: () => userAPIService.getUserProfile(),
  });

  const handleLogout = async () => {
    try {
      await authWithTokenAPIService.logout();
    } catch (err) {
      catchAPIError(err);
    }
  };

  if (!data) return null;

  return (
    <div className="rounded-[1.25rem] bg-white px-9 py-8">
      <h2 className="text-heading-rg text-gray-800">내 계정</h2>

      <div className="my-6 h-px w-full bg-gray-200" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={data.data.imageUrl ?? DefaultImg}
            alt="profileImg"
            width={64}
            height={64}
            className="rounded-full"
          />

          <div className="space-y-1">
            <p className="text-headline-sb text-gray-800">
              {data.data.lastName}
              {data.data.firstName}
            </p>

            <div className="flex items-center gap-1">
              <MailIcon />
              <p className="text-body-1 text-gray-800">{data.data.email}</p>
            </div>
          </div>
        </div>

        <button
          className="flex items-center gap-1 rounded-xl border border-solid border-gray-300 bg-white px-6 py-4"
          onClick={handleLogout}
        >
          로그아웃
          <RightIcon />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
