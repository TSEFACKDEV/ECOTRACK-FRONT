import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router";
import Heading from "../../components/Heading";
import {
  
  FiRefreshCw,
  FiTrash2,
  FiFeather, // Remplace FiLeaf par FiFeather ici
  FiGrid
} from "react-icons/fi";
import { API_URL } from "../../config";
import { MdLightbulbOutline } from "react-icons/md";

type Category = "TRI" | "RECYCLAGE" | "COMPOSTAGE";
type Filter = Category | "ALL";

interface Tip {
  id: string;
  title: string;
  description: string;
  image: string;
  categorie: Category;
  createdAt: string;
  updatedAt: string;
}

export const categoryLabels: Record<Category, string> = {
  TRI: "Tri",
  RECYCLAGE: "Recyclage",
  COMPOSTAGE: "Compostage",
};

export const categoryColors: Record<Category, string> = {
  TRI: "bg-blue-100 text-blue-700",
  RECYCLAGE: "bg-green-100 text-green-700",
  COMPOSTAGE: "bg-yellow-100 text-yellow-700",
};

const categoryIcons: Record<Category, JSX.Element> = {
  TRI: <FiTrash2 className="text-blue-400 text-5xl opacity-20 absolute right-4 bottom-4" />,
  RECYCLAGE: <FiRefreshCw className="text-green-400 text-5xl opacity-20 absolute right-4 bottom-4" />,
  COMPOSTAGE: <FiFeather className="text-yellow-400 text-5xl opacity-20 absolute right-4 bottom-4" />, // Remplace FiLeaf par FiFeather
};

const filterOptions: { label: string; value: Filter; icon: JSX.Element }[] = [
  { label: "Tous", value: "ALL", icon: <FiGrid /> },
  { label: "Tri", value: "TRI", icon: <FiTrash2 /> },
  { label: "Recyclage", value: "RECYCLAGE", icon: <FiRefreshCw /> },
  { label: "Compostage", value: "COMPOSTAGE", icon: <FiFeather /> }, // Remplace FiLeaf par FiFeather
];

const ConseilCard = ({ tip, onClick }: { tip: Tip; onClick: () => void }) => (
  <div
    className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden cursor-pointer transition hover:shadow-2xl border border-gray-100 group focus:ring-2 focus:ring-emerald-400"
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={`Lire le conseil ${tip.title}`}
    onKeyDown={e => { if (e.key === "Enter") onClick(); }}
  >
    <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
      <img
        src={tip.image ? `${API_URL}/${tip.image}` : "/placeholder.jpg"}
        alt={tip.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        onError={e => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
      />
      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow ${categoryColors[tip.categorie]}`}>
        {categoryLabels[tip.categorie]}
      </div>
      <div className="absolute right-3 bottom-3">{categoryIcons[tip.categorie]}</div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <span className="text-xs text-gray-400 mb-1">
        {new Date(tip.createdAt).toLocaleDateString()}
      </span>
      <h3 className="text-lg font-bold mb-2 line-clamp-2">{tip.title}</h3>
      <div className="relative flex-1 mb-2">
        <p className="text-gray-600 text-sm line-clamp-3">
          {tip.description}
        </p>
        {/* Dégradé pour overflow */}
        <div className="absolute bottom-0 left-0 w-full h-6 pointer-events-none bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <button
        className="mt-auto px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold shadow hover:bg-emerald-600 transition"
        tabIndex={-1}
      >
        Lire plus
      </button>
    </div>
  </div>
);

const Conseils = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await api.get("/tip");
        setTips(response.data.data);
      } catch {
        setTips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  const filteredTips =
    filter === "ALL" ? tips : tips.filter((tip) => tip.categorie === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 pt-24 pb-10 px-2">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-green-200 text-green-700 w-16 h-16 shadow-lg">
            <MdLightbulbOutline className="text-4xl" />
          </span>
        </div>
        <Heading
          title="Conseils pour la gestion des déchets"
          subTitle="Découvrez nos astuces pour mieux trier, recycler et composter vos déchets."
        />
      </div>
      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 font-semibold shadow transition-all duration-200
              ${
                filter === opt.value
                  ? "bg-green-600 text-white border-green-600 scale-105"
                  : "bg-white text-green-700 border-green-200 hover:bg-green-100"
              }`}
            onClick={() => setFilter(opt.value)}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
      {/* Cartes */}
      <section className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full text-center text-lg text-green-700">
            Chargement...
          </div>
        ) : filteredTips.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-500">
            Aucun conseil disponible.
          </div>
        ) : (
          filteredTips.map((tip) => (
            <ConseilCard key={tip.id} tip={tip} onClick={() => navigate(`/conseils/${tip.id}`)} />
          ))
        )}
      </section>
    </main>
  );
};

export default Conseils;