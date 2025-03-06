import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="flex flex-row min-h-screen">
        <div className="basis-1/2 min-h-screen bg-neutral-800 relative flex items-center justify-center">
          <div className="">
            <h1 className="text-4xl font-bold text-white mb-2">
              PT. BTJ FARMA
            </h1>
            <span className="text-xs italic text-neutral-400 block mb-4">
              part of BERSERI GROUP
            </span>
            <p className="max-w-96 text-neutral-300 font-normal">
              To be a leading, innovative, and beneficial pharmaceutical company
              for everyone
            </p>
          </div>
        </div>
        <div className="basis-1/2 min-h-screen flex justify-center items-center">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
