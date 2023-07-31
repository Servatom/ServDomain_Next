"use client";

import UpdateEmail from "@/components/Account/UpdateEmail";

export default function CompleteProfile() {
  return (
    <div className="h-full w-full flex flex-col">
      <h1 className="font-semibold text-4xl p-12 text-gray-300 flex flex-row items-center">
        Complete Profile
      </h1>
      <UpdateEmail />
    </div>
  );
}
