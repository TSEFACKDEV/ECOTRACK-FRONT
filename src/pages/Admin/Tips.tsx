import React, { useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import eco from '../../images/dash/eco.png'
const CATEGORIES = [
  'TRI',
  'COMPOSTAGE',
  'RECYCLAGE',
];

const Tips = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (imageFile) formData.append('image', imageFile);
      formData.append('categorie', category);

      await api.post('/tip', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Conseil créé avec succès');
      setTitle('');
      setDescription('');
      setImageFile(null);
      setCategory('');
      (document.getElementById('imageFile') as HTMLInputElement).value = '';
    } catch (error) {
      toast.error('Erreur lors de la création du conseil');
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-2">
      <section className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-green-100 p-0 overflow-hidden flex flex-col md:flex-row">
        {/* Illustration & Intro */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex flex-col items-center justify-center p-8 gap-6">
          <img
            src={eco}
            alt="Conseil illustration"
            className="w-32 h-32 object-contain drop-shadow-lg mb-2"
            loading="lazy"
          />
          <h2 className="text-3xl font-extrabold text-green-800 mb-2 text-center drop-shadow-sm tracking-tight">
            Créer un Conseil / Astuce
          </h2>
          <p className="text-center text-green-700 text-lg font-medium">
            Partagez vos astuces pour aider la communauté à mieux trier, recycler ou composter.
          </p>
        </div>
        {/* Formulaire */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div>
              <label className="block text-green-800 font-semibold mb-2" htmlFor="title">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-green-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 bg-green-50/60 transition shadow-sm"
                placeholder="Titre du conseil"
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-2" htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-green-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 bg-green-50/60 transition resize-none shadow-sm"
                rows={4}
                placeholder="Décrivez le conseil ou l'astuce"
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-2" htmlFor="imageFile">
                Image (optionnel)
              </label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="imageFile"
                  className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 rounded-xl border border-green-300 shadow-sm transition"
                >
                  Choisir une image
                </label>
                <span className="text-green-700 text-sm truncate max-w-[180px]">
                  {imageFile ? imageFile.name : "Aucun fichier choisi"}
                </span>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-2" htmlFor="category">
                Catégorie <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-green-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 bg-green-50/60 transition shadow-sm"
                required
              >
                <option value="" disabled>Choisissez une catégorie</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Publier le conseil
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Tips;