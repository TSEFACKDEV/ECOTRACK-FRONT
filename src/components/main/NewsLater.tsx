import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

const NewsLater: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-lg mx-auto my-16 border border-green-100 overflow-hidden"
      style={{
        boxShadow:
          "0 8px 32px 0 rgba(34,197,94,0.15), 0 1.5px 8px 0 rgba(34,197,94,0.10)",
      }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-200/60 to-green-400/30 rounded-full blur-2xl z-0" />
      <div className="flex flex-col items-center relative z-10">
        <span className="bg-gradient-to-tr from-green-200 via-green-100 to-green-50 rounded-full p-5 mb-4 shadow-lg animate-pulse">
          <FiMail size={40} className="text-green-600 drop-shadow-lg" />
        </span>
        <h2 className="text-3xl font-black text-green-800 mb-2 text-center drop-shadow-sm tracking-tight">
          Restez informé&nbsp;!
        </h2>
        <p className="text-green-700 mb-7 text-center max-w-md text-base font-medium">
          Abonnez-vous à notre newsletter pour recevoir nos actualités, conseils et nouveautés en exclusivité.
        </p>
      </div>
      {submitted ? (
        <div className="flex flex-col items-center gap-2 text-green-700 font-semibold text-center text-lg py-8 transition-all duration-700 animate-fade-in">
          <span className="text-3xl">🎉</span>
          Merci pour votre inscription&nbsp;!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center relative z-10"
        >
          <input
            type="email"
            required
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-3 rounded-xl border border-green-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-400 w-full max-w-xs shadow transition placeholder:text-green-400 text-green-800 font-medium"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold px-10 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-100 focus:ring-2 focus:ring-green-400"
          >
            S’abonner
          </button>
        </form>
      )}
    </section>
  );
};

export default NewsLater;