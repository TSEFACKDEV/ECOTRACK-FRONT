import React from "react";

import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMap, FiMapPin, FiPhone, FiRefreshCw, FiTwitter } from "react-icons/fi";

import { Link } from "react-router";

const FooterLinks = [
  { to: "/", label: "Accueil" },
  { to: "/blog", label: "Blog" },
  { to: "/signalement", label: "Signalements" },
  { to: "/planing", label: "Planing" },
  { to: "/dons", label: "Dons" },
  { to: "/about", label: "A Propos" },
  { to: "/faq", label: "FAQs" },
]
const Footer = () => {
  return (
    <div className=" bg-[#1F2937] text-white p-8 ">
      {/* footer du haut  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4 ">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-[#10B981] text-2xl font-bold cursor-pointer"
          >
            <FiRefreshCw className="text-[#10B981]" size={28} />
            Eco <span className="font-extrabold text-white">Track</span>
          </Link>
          <p>Notre mission: rendre le cameroun plus propre, grace à la participation citoyenne et à la gestion éfficace des déchets</p>
        </div>

        <div>
          <h1 className="text-2xl mb-2 font-bold">Liens Rapides</h1>
          <ul>
            {FooterLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className=" hover:text-[#10B981] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="text-2xl mb-2 font-bold" >Contact</h1>
          <div>
            <p className="flex  items-center gap-2 " > <FiMapPin className="text-[#10B981] " /> Adresse: PK17, Douala, Cameroun</p>
            <p className="flex  items-center gap-2 " > <FiPhone className="text-[#10B981] " /> Téléphone: +237 653 360 437</p>
            <p className="flex  items-center gap-2 " > <FiMail className="text-[#10B981] " /> Email: EcoTrack@gmail.com</p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl mb-2 font-bold" >Réseau Sociaux</h1>
          <div className="flex items-center gap-3">
             <FiFacebook className="text-[#10B981] size-[28] "/> 
             <FiTwitter className="text-[#10B981] size-[28] "/> 
             <FiInstagram className="text-[#10B981] size-[28] "/> 
             <FiLinkedin className="text-[#10B981] size-[28] "/> 
          </div>

        </div>
      </div>

      {/* footer du bas */}
      <div>
        <hr className="mb-3" />
        <p className="text-center"> &copy; 2025 EcoTrack - Tous drois réservés </p>
      </div>
    </div>
  );
};

export default Footer;
