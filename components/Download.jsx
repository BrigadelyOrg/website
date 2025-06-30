import Image from "next/image";
import Link from "next/link";
import React from "react";

const Download = () => {
  return (
    <div className="bg-blue-600 relative text-white  px-0 md:px-14 rounded-xl shadow-lg max-w-5xl mx-5 md:mx-auto my-24 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text content */}
        <div className="px-6 py-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center md:text-left">
            Getting started takes <br className="hidden md:block" /> just a few
            taps
          </h2>
          <p className="text-base mb-6 text-center md:text-left">
            From creating your account to securing with your pin can be achieved
            in less than 3 minutes.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="#">
              <Image
                src="/img/googleLight.png"
                alt="Get it on Google Play"
                width={150}
                height={150}
              />
            </Link>
            <Link href="#">
              <Image
                src="/img/appleLight.png"
                alt="Download on the App Store"
                width={150}
                height={150}
              />
            </Link>
          </div>
        </div>

        <div className=" ">
          {/* <Image
            src="/img/phoneDouble.png"
            alt="Background image"
            width={600}
            height={600}
            className="md:hidden"
          /> */}

          <div
            className="md:hidden bg-cover bg-no-repeat bg-center w-full"
            style={{
              backgroundImage: "url('/img/phoneDouble.png')",

              height: "600px",
            }}
          />
        </div>
      </div>

      <Image
        src="/img/phoneDouble.png"
        alt="Background image"
        width={490}
        height={490}
        className="absolute -top-8 right-3   hidden md:block"
      />
    </div>
  );
};

export default Download;
