import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

import { SOCIAL_PROFILES } from "@/lib/site";

// The URLs live in lib/site.ts, which also feeds the Organization structured data's `sameAs`.
const ICONS = {
  Facebook: <FaFacebookF />,
  LinkedIn: <FaLinkedinIn />,
  Instagram: <FaInstagram />,
};

const Socials = ({ iconStyles }) => {
  const socialLinks = SOCIAL_PROFILES.map((profile) => ({ ...profile, icon: ICONS[profile.name] }));

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
