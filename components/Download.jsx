import Image from "next/image";
import Link from "next/link";
import React from "react";

const Download = () => {
  return (
    <div className="bg-[#007a3d] relative text-white px-0 md:px-14 rounded-2xl shadow-lg max-w-5xl mx-5 md:mx-auto my-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="px-8 py-14">
          <p className="uppercase text-xs tracking-widest text-green-200 font-semibold mb-4">
            Mobile app
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Manage your team <br className="hidden md:block" /> from anywhere
          </h2>
          <p className="text-green-100 text-base mb-8 leading-relaxed">
            Approve payroll, onboard new hires, and track expenses on the go.
            Getting started takes less than 3 minutes.
          </p>
          <div className="flex gap-4 justify-start flex-wrap">
            <Link href="#">
              <Image
                src="/img/googleLight.png"
                alt="Get it on Google Play"
                width={150}
                height={45}
                className="hover:opacity-90 transition"
              />
            </Link>
            <Link href="#">
              <Image
                src="/img/appleLight.png"
                alt="Download on the App Store"
                width={150}
                height={45}
                className="hover:opacity-90 transition"
              />
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <div
            className="bg-cover bg-no-repeat bg-center w-full"
            style={{
              backgroundImage: "url('/img/phoneDouble.png')",
              height: "400px",
            }}
          />
        </div>
      </div>

      <Image
        src="/img/phoneDouble.png"
        alt="Brigadely mobile app"
        width={490}
        height={490}
        className="absolute -top-8 right-3 hidden md:block"
      />
    </div>
  );
};

export default Download;
