"use client";

import { AnnouncementCop } from "@/components/Announcement";
import { Holiday } from "@/components/Holiday";
import { ArrowLeftSvg, ArrowRightSvg } from "@/components/Svg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { findDaysBetweenDates, formatDate, holidays } from "@/utils/helpers";
import { holidayTypes } from "@/utils/types";
import { Announcement, Leave } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
interface DashboardManagerWidgetPageProps {
  leaves: Leave[];
  announcements: Announcement[];
}

const DashboardManagerWidgetPage = ({
  leaves,
  announcements
}: DashboardManagerWidgetPageProps) => {
  const newAnnLength = () => {
    if (announcements.length > 0) {
      const currentDate = formatDate(new Date());

      const newAnn = announcements.filter((ann) =>
        ann.createdAt ? formatDate(new Date(ann.createdAt)) : "" === currentDate
      );

      return newAnn.length;
    }

    return 0;
  };

  return (
    <motion.section
      initial={{ y: "-10%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="p-6 bg-[#F9F9F9] rounded-[32px] space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-medium leading-5 text-[24px] font-ibm_plex_mono">
          Dashboard
        </h1>
      </div>

      <div className="w-full grid grid-cols-2 gap-6">
        <div>
          <div className="space-y-6 bg-white p-4 rounded-[24px]">
            <h2 className="font-medium leading-5 text-[16px] font-ibm_plex_mono">
              Upcomming Holidays
            </h2>
            <div className="max-h-[320px] overflow-y-scroll">
              <div
                className="p-4 h-full"
                style={{
                  borderRadius: "16px",
                  border: "0.5px solid #CDDFE9"
                }}
              >
                {holidays.map((holiday, index) => (
                  <Holiday
                    key={index}
                    date={holiday.date}
                    title={holiday.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-6 bg-white p-4 rounded-[24px]">
            <div className="flex items-center space-x-3 w-full">
              <h2 className="font-medium leading-6 text-[16px] text-black font-ibm_plex_mono">
                Announcements
              </h2>
              <p className="text-[#006A86] font-ibm_plex_mono font-medium leading-6">
                {`(${newAnnLength().toString()} new)`}
              </p>
            </div>
            <div className="max-h-[320px] overflow-y-scroll">
              <div className="h-full">
                <div className="space-y-6 h-full">
                  {announcements.length > 0 ? (
                    announcements.map((ann) => (
                      <AnnouncementCop
                        key={ann.id}
                        date={ann.updatedAt}
                        description={ann.description}
                        id={ann.id}
                        owner={ann.owner}
                        role={"Staff"}
                      />
                    ))
                  ) : (
                    <p className="font-medium font-bricolage text-center">
                      No Announcements yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 rounded-[24px] bg-white space-y-6">
        <h2 className="font-medium leading-5 text-[16px] font-ibm_plex_mono">
          Leave application summary
        </h2>
        {leaves.length > 0 ? (
          <div>
            <Table className="w-full">
              <TableHeader className="w-full">
                <TableRow className="text-[#475467] text-[14px] font-normal leading-5">
                  <TableHead>Names</TableHead>
                  <TableHead>Leave type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Counts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                {leaves.map((l) => (
                  <TableRow
                    key={l.id}
                    className=" text-[#475467] text-[14px] font-normal leading-5"
                  >
                    <TableCell className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full flex justify-center items-center bg-[#006A86] text-white uppercase">
                        {l.name[0]}
                      </span>
                      <p> {l.name}</p>
                    </TableCell>
                    <TableCell>{l.title}</TableCell>

                    <TableCell>
                      {l.startDate ? formatDate(new Date(l.startDate)) : ""}
                    </TableCell>
                    <TableCell>
                      {l.endDate ? formatDate(new Date(l.endDate)) : ""}
                    </TableCell>
                    <TableCell className="">
                      {l.status === "IsApproved" && (
                        <span className="flex items-center w-fit space-x-1 px-[12px] py-1 bg-[#ECFDF3] text-[#027A48] rounded-[16px]">
                          <p>Approved</p>
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="#12B76A"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                      {l.status === "Pending" && (
                        <span className="flex items-center w-fit space-x-1 px-[12px] py-1 bg-[#F2F4F7] text-black rounded-[16px]">
                          <p>Pending ...</p>
                        </span>
                      )}
                      {l.status === "Rejected" && (
                        <span className=" flex items-center w-fit space-x-1 px-[12px] py-1 bg-[#FEF3F2] text-[#B42318] rounded-[16px]">
                          <p>Declined</p>
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.5 3.5L3.5 8.5M3.5 3.5L8.5 8.5"
                              stroke="#F04438"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {findDaysBetweenDates(
                        l.startDate ? formatDate(new Date(l.startDate)) : "",
                        l.endDate ? formatDate(new Date(l.endDate)) : ""
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="w-full border-[#EAECF0] border-[1px] flex items-center justify-between pt-[10px] pb-[13px] rounded-b-md px-5">
              <Button
                className="flex items-center gap-[6.5px] border-[0.823px] border-[#EAECF0] rounded-[6.5px] px-[11.5px] py-[4px] text-[11.4px] text-[#344054] font-semibold leading-[16.462px] cursor-pointer bg-white hover:bg-white/80"
                text="Preview"
                position="left"
                svg={<ArrowLeftSvg />}
                disabled={true}
                // onClick={previousHandle}
              />
              <Button
                className={cn(
                  "flex items-center gap-[6.5px] border-[0.823px] border-[#EAECF0] rounded-[6.5px] px-[11.5px] py-[4px] text-[11.4px] text-[#344054] font-semibold leading-[16.462px] cursor-pointer bg-white hover:bg-white/80"
                )}
                text="Next"
                svg={<ArrowRightSvg />}
                // disabled={isLastPage}
                // onClick={nextHandle}
              />
            </div>
          </div>
        ) : (
          <p>No Leave yet</p>
        )}
      </div>
    </motion.section>
  );
};

export default DashboardManagerWidgetPage;
