import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FiArrowLeft, FiTag } from "react-icons/fi";
import { API_URL } from "../../config";
import { categoryLabels, categoryColors } from "./Conseils";

type Category = "TRI" | "RECYCLAGE" | "COMPOSTAGE";

interface Tip {
  id: string;
  title: string;
  description: string;
  image: string;
  categorie: Category;
  createdAt: string;
  updatedAt: string;
}

const Conseil = () => {
  const { id } = useParams<{ id: string }>();
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchTip = async () => {
    try {
      const res = await fetch(`${API_URL}/eco/tip/${id}`);
      const data = await res.json();
      setTip(data.data.tip); // <-- Correction ici
    } catch {
      setTip(null);
    } finally {
      setLoading(false);
    }
  };
  fetchTip();
}, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-green-700">Chargement...</div>;
  }

  if (!tip) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Conseil introuvable.</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 pt-24 pb-10 px-2">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
        <button
          className="flex items-center gap-2 px-4 py-2 text-green-700 hover:underline mt-4 ml-4"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft /> Retour
        </button>
        <div className="relative w-full h-64 bg-gradient-to-tr from-green-100 to-green-50 overflow-hidden">
          <img
            src={`${API_URL}/${tip.image}`}
            alt={tip.title}
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow ${categoryColors[tip.categorie]}`}>
            <FiTag />
            {categoryLabels[tip.categorie]}
          </span>
        </div>
        <div className="p-8">
          <h1 className="text-2xl font-bold text-green-800 mb-4">{tip.title}</h1>
          <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">{tip.description}</p>
          <div className="text-xs text-gray-400">
            Publié le {new Date(tip.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Conseil;