import React from "react";
import Heading from "../Heading";
import { FaTrash, FaTruck, FaHandHoldingHeart } from "react-icons/fa6";
import { RiUserCommunityFill } from "react-icons/ri";

const stats = [
  {
    icon: <FaTrash className="text-emerald-500 group-hover:scale-110 group-hover:text-emerald-600 transition-transform duration-300" size={40} />,
    value: "+250",
    label: "Signalements traités",
  },
  {
    icon: <RiUserCommunityFill className="text-teal-500 group-hover:scale-110 group-hover:text-teal-600 transition-transform duration-300" size={40} />,
    value: "+120",
    label: "Citoyens actifs",
  },
  {
    icon: <FaHandHoldingHeart className="text-green-500 group-hover:scale-110 group-hover:text-green-600 transition-transform duration-300" size={40} />,
    value: "+250",
    label: "Actions solidaires",
  },
  {
    icon: <FaTruck className="text-lime-500 group-hover:scale-110 group-hover:text-lime-600 transition-transform duration-300" size={40} />,
    value: "+15",
    label: "Itinéraires optimisés",
  },
];

const ImpactSection = () => {
  return (
    <section className="flex flex-col items-center mx-auto min-h-[80vh] px-4 py-16 sm:px-8 md:px-16 bg-gradient-to-br from-white via-emerald-50 to-teal-50">
      <Heading
        title="Notre Impact"
        subTitle="grâce à votre participation, nous améliorons quotidiennement notre environnement"
      />
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-8 border border-transparent hover:border-emerald-200"
          >
            <div className="mb-4">{stat.icon}</div>
            <h4 className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
              {stat.value}
            </h4>
            <p className="text-gray-500 text-center text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;