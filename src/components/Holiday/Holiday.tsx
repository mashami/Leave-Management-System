"use client";

import { holidayTypes } from "@/utils/types";
import { LocationSvg } from "../Svg";

const Holiday = ({ date, title }: holidayTypes) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleString("en-US", { month: "short" }); // e.g., Dec
  return (
    <div className="w-full flex justify-between p-[10px]">
      <div className="flex items-center space-x-6">
        <div className="w-9 h-9 rounded-full bg-[#006A86] flex flex-col space-y-1 items-center justify-center">
          <p className="text-[14.316px] font-medium text-white leading-[13px]">
            {day}
          </p>
          <p className="font-normal text-[8px] text-white leading-[6px]">
            {month}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[14px] font-medium leading-4 text-black">
            {title}
          </p>
          <span className="flex items-center space-x-[6px]">
            <LocationSvg />
            <p className="text-[#878787] text-[12px] font-medium leading-[18px]">
              Kigali city, Rwanda
            </p>
          </span>
        </div>
      </div>
      <div className="w-4 h-4 rounded-full bg-[#006A86]"></div>
    </div>
  );
};

export default Holiday;
