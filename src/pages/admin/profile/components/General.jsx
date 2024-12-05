import Card from "@/components/card";
import React, { useEffect, useState } from "react";
import avatar from "@/assets/img/avatars/avatar11.png";
import banner from "@/assets/img/profile/banner.png";
import affiliateBanner from "/affiliate.webp";
import { useAuth } from "@/hooks/auth";
import { getReadablePlanName, formatDateToCustomString } from "@/utils/formatter";
import ChangePassword from "./ChangePassword";

const General = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [refUrl, setRefUrl] = useState("");



  const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(refUrl).then(() => {
          setIsCopied(true);
          
          setTimeout(() => setIsCopied(false), 2000);
      });
  };
  const { data, isLoading } = useAuth();
  useEffect(() => {
    const protocol = window.location.protocol; 
    const hostname = window.location.hostname; 
    const port = window.location.port; 
    
    const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  const fullRefUrl = `${baseUrl}/signup?ref=${data?.referralCode}`;
    setRefUrl(fullRefUrl);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col rounded-xl md:p-[20px] gap-[20px]">
     
      <div className="w-full flex lg:flex-row flex-col  gap-[20px]">
        <Card extra="items-center w-full h-full p-[16px] bg-cover">
          <div
            className="relative mt-1 flex h-[200px] w-full justify-center rounded-xl bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img className="h-full w-full rounded-full" src={data?.profileImg} alt="Avatar" />
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
      <div className="flex lg:flex-row flex-col gap-3 w-full items-center">
      <ChangePassword />
     
        <Card extra="items-center w-full h-full p-[16px] bg-cover">
          <div
            className="relative mt-1 flex h-[200px] w-full justify-center rounded-xl bg-cover"
            style={{ backgroundImage: `url(${affiliateBanner})` }}
          >
            
          </div>

          <div className=" mt-4 flex flex-col items-center">
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
                {data?.referrals.length || 0}
              </p>
              <p className="text-sm font-normal text-gray-600">Total Referrals</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                {data?.commission.toFixed(2) || 0}
              </p>
              <p className="text-sm font-normal text-gray-600">Commissions</p>
            </div>
            
          </div>
          <div className="px-4 w-full pb-4 md:px-5 md:pb-5">
    <label
        htmlFor="course-url"
        className="text-sm font-poppins font-medium text-gray-900 dark:text-white mb-2 block"
    >
        Invite new Member to earn commission on every transaction they make
    </label>
    <div onClick={handleCopyToClipboard} className="relative mb-4">
              <div
                onClick={handleCopyToClipboard}
            id="course-url"
            type="text"
            className={`col-span-6 bg-gray-50 border text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                isCopied ? "border-green-500 text-green-500 focus:ring-green-500" : "border-gray-300"
            }`}
            
           
              >
                {refUrl}
        </div>
        <button
            onClick={handleCopyToClipboard}
            className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
        >
            {isCopied ? (
                <svg
                    className="w-3.5 h-3.5 text-green-500 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                    />
                </svg>
            ) : (
                <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
            )}
        </button>
        <div className={`absolute ${isCopied ? "text-green-500" : ""} z-10 text-sm`}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
        </div>
    </div>
</div>

        </Card>
        
       </div>
    </div>
  );
};

export default General;
