import Card from "@/components/card";
import React from "react";
import avatar from "@/assets/img/avatars/avatar11.png";
import banner from "@/assets/img/profile/banner.png";
import { useAuth } from "@/hooks/auth";
import { getReadablePlanName, formatDateToCustomString } from "@/utils/formatter";
import ChangePassword from "./ChangePassword";

const General = () => {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex rounded-xl p-[20px] gap-[20px]">
      <div className="w-full flex flex-col gap-[20px]">
        <Card extra="items-center w-full h-full p-[16px] bg-cover">
          <div
            className="relative mt-1 flex h-[200px] w-full justify-center rounded-xl bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img className="h-full w-full rounded-full" src={avatar} alt="Avatar" />
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {data?.name || ""}
            </h4>
            <p className="text-base font-normal text-gray-600">
              {data?.role === "common" ? "" : "Admin"}
            </p>
          </div>

          <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                {data?.credits || 0}
              </p>
              <p className="text-sm font-normal text-gray-600">Remaining credits</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                {data?.totalCredits || 0}
              </p>
              <p className="text-sm font-normal text-gray-600">Total used credits</p>
            </div>
          </div>
        </Card>
        <ChangePassword />
      </div>

      <Card extra="w-full h-full p-3">
        <div>
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              General Information
            </h4>
          </div>

          <div className="grid gap-4 px-2">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.email || "N/A"}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Plan Expiration</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.subscription?.expiresAt
                  ? formatDateToCustomString(data.subscription.expiresAt)
                  : `${" No expiration found"}`}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Plan</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.subscription?.name
                  ? getReadablePlanName(data.subscription.name)
                  : `${"No plan found "}`}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.phone ? `${data.phone}` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default General;
