import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const GetStartedBtn = ({ customClass, label = "Join Our Waitlist" }) => {
  return (
    <Link href="https://forms.gle/MZjpMyXYd9fR9Sx4A" target="_blank">
      <button
        className={`w-fit flex items-center py-3 px-6 rounded-full font-semibold transition duration-200 ${
          customClass || "bg-[#007a3d] text-white hover:bg-[#005a2d]"
        }`}
      >
        {label} <GoArrowUpRight className="ml-2" size={20} />
      </button>
    </Link>
  );
};

export default GetStartedBtn;
