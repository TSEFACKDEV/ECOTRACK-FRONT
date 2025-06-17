import React, { useState } from 'react';
import { FiDollarSign, FiMail, FiPhone, FiUser } from 'react-icons/fi';

export interface DonationData {
  name: string;
  email: string;
  amount: number;
  phone: string;
}

const Dons = () => {
  const [form, setForm] = useState<DonationData>({
    name: '',
    email: '',
    amount: 0,
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center pt-24 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-extrabold text-green-700 text-center mb-4 drop-shadow-lg">
          Faire un don
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Votre soutien nous aide à poursuivre nos actions pour un Cameroun plus propre.<br />
          <span className="font-semibold text-green-700">Merci pour votre générosité !</span>
        </p>
        <div className="bg-white/90 shadow-2xl rounded-2xl p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-green-500 bg-gray-50 transition">
                  <FiUser className="text-green-400 mr-2" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-green-500 bg-gray-50 transition">
                  <FiMail className="text-green-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="exemple@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Montant (XAF)</label>
                <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-green-500 bg-gray-50 transition">
                  <FiDollarSign className="text-green-400 mr-2" />
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    min={100}
                    required
                    className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="Montant"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Téléphone (MTN/Orange)</label>
                <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-green-500 bg-gray-50 transition">
                  <FiPhone className="text-green-400 mr-2" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="6 XX XX XX XX"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 rounded-lg shadow-lg transition text-lg"
              >
                Faire un don
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-8">
              <div className="text-green-600 text-5xl flex justify-center mb-2">
                <FiDollarSign />
              </div>
              <h2 className="text-2xl font-bold text-green-700">Merci pour votre don !</h2>
              <p className="text-gray-700">
                <span className="font-semibold">{form.name}</span>, nous avons bien reçu votre don de <span className="font-semibold">{form.amount} XAF</span>.<br />
                Un reçu sera envoyé à <span className="font-semibold">{form.email}</span>.
              </p>
              <button
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow"
                onClick={() => {
                  setForm({ name: '', email: '', amount: 0, phone: '' });
                  setSubmitted(false);
                }}
              >
                Faire un autre don
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dons;