import Link from "next/link";
import React from "react";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Socials = ({ iconStyles }) => {
  const socialLinks = [
    // {
    //   name: "Twitter",
    //   icon: <FaTwitter />,
    //   url: "https://x.com/MoshoodDebug",
    // },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "",
    },
    {
      name: "LinkedIn",
      icon: <FaTwitter />,
      url: "",
    },
    {
      name: "Instagram",
      icon: <FaLinkedinIn />,
      url: "",
    },
    {
      name: "WhatsAapp",
      icon: <FaInstagram />,
      url: "",
    },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition duration-200"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
