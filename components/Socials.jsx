import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Socials = ({ iconStyles }) => {
  const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF />, url: "" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: "" },
    { name: "Instagram", icon: <FaInstagram />, url: "" },
    { name: "WhatsApp", icon: <FaWhatsapp />, url: "" },
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
