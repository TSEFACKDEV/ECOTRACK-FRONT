import React, { useState } from 'react';

const Signalement = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [telephone, setTelephone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 pt-28 pb-10 px-2">
      <section className="max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-0 overflow-hidden border border-green-100">
        <div className="bg-gradient-to-r from-green-600 to-green-400 py-8 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow">
            Signaler un dépôt d’ordures
          </h1>
          <p className="text-green-50/90 mb-2 text-base md:text-lg">
            Aidez-nous à garder la ville propre en remplissant ce formulaire.
          </p>
        </div>
        <div className="p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
              <span className="text-6xl mb-4">✅</span>
              <p className="text-xl text-green-700 font-semibold mb-2">Merci pour votre signalement !</p>
              <p className="text-green-800">Notre équipe interviendra rapidement.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-7" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label className="block text-green-800 font-semibold mb-2" htmlFor="description">
                  Description du dépôt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  className="border border-green-200 rounded-2xl p-4 w-full focus:ring-2 focus:ring-green-400 resize-none bg-green-50/40 transition"
                  rows={4}
                  placeholder="Décrivez le dépôt d’ordures (lieu, type, quantité, etc.)"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-green-800 font-semibold mb-2" htmlFor="photo">
                  Photo du dépôt <span className="text-green-500 text-xs">(optionnel)</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
                  />
                  {photoPreview && (
                    <div className="rounded-xl border border-green-100 shadow bg-white p-2">
                      <img
                        src={photoPreview}
                        alt="Aperçu du dépôt"
                        className="rounded-lg max-h-32 max-w-[140px] object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-green-800 font-semibold mb-2" htmlFor="location">
                  Localisation <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  className="border border-green-200 rounded-2xl p-3 w-full focus:ring-2 focus:ring-green-400 bg-green-50/40 transition"
                  placeholder="Adresse ou quartier"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-green-800 font-semibold mb-2" htmlFor="telephone">
                    Téléphone <span className="text-green-500 text-xs">(optionnel)</span>
                  </label>
                  <input
                    id="telephone"
                    type="tel"
                    className="border border-green-200 rounded-2xl p-3 w-full focus:ring-2 focus:ring-green-400 bg-green-50/40 transition"
                    placeholder="Votre numéro"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-150"
              >
                Envoyer le signalement
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Signalement;