import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Socials = ({ iconStyles }) => {
  const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/people/Brigadely/61591625181991/" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: "https://www.linkedin.com/company/brigadely" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/getbrigadely/" },
    
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-[#007a3d] transition duration-200 ${iconStyles}`}
          aria-label={social.name}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
