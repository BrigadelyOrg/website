import React from "react";

const companies = [
  "Flint HQ",
  "Gidi Technologies",
  "PrimeBuilds NG",
  "Velo Nigeria",
  "Starta Labs",
  "NaijaStack",
];

const TrustBar = () => {
  return (
    <section className="bg-white border-b border-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-semibold mb-7">
          Trusted by growing teams across Africa
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {companies.map((name) => (
            <span
              key={name}
              className="text-gray-400 font-semibold text-sm tracking-wide hover:text-gray-600 transition-colors duration-200 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
