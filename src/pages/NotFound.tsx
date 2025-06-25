import React from "react";
import { Link } from "react-router";
import Heading from "../components/Heading";


const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Heading
        title="404 - Page non trouvée"
        subTitle="Oups ! La page que vous cherchez n'existe pas ou a été déplacée."
      />
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-emerald-500 text-white rounded-full shadow hover:bg-emerald-600 transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;