import React from "react";
import Heading from "../Heading";
import ecole from "../../images/Blog/ecole.jpeg"
import electronique from "../../images/Blog/electronique.jpeg"
import recyclage from "../../images/Blog/recyclage.jpeg"
import { Link } from "react-router";
const articles = [
  {
    id: 1,
    title: "Lancement du nouveau programme de recyclage",
    content:
      "La ville lance un nouveau programme de recyclage pour améliorer la gestion des déchets et sensibiliser les citoyens.",
    date: "10 juin 2025",
    image: recyclage,
  },
  {
    id: 2,
    title: "Collecte spéciale des déchets électroniques",
    content:
      "Une collecte spéciale pour les déchets électroniques aura lieu ce samedi dans tous les quartiers.",
    date: "8 juin 2025",
    image: electronique,
  },
  {
    id: 3,
    title: "Sensibilisation dans les écoles",
    content:
      "Des ateliers de sensibilisation à la gestion des déchets sont organisés dans les écoles primaires.",
    date: "5 juin 2025",
    image: ecole
 },
];

const Actualite = () => {
  return (
    <div className="flex flex-col items-center mx-auto min-h-[80vh] px-4 py-16 sm:px-8 md:px-16 bg-gradient-to-br from-white via-emerald-50 to-teal-50">
      <Heading
        title="Actualités Récentes"
        subTitle="rester informer des derniere conseils concernent la gestion des déchets "
      />
      <div className="grid gap-8 mt-8 md:grid-cols-3 w-full max-w-6xl">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs text-gray-400 mb-2">{article.date}</span>
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 flex-1">{article.content}</p>
              <Link to={`/conseils`} className="mt-4 self-start px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition">
                En savoir Plus
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to={"/conseils"} className="mt-10 px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
        Voir plus de Conseils
      </Link>
    </div>
  );
};

export default Actualite;