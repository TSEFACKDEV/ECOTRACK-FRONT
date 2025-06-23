import React, { useState } from 'react';
import Heading from '../../components/Heading';

const faqList = [
  {
    question: "Comment signaler un dépôt d'ordures ?",
    answer:
      "Cliquez sur 'Signaler' dans la page d'accueil ou le menu, remplissez le formulaire en décrivant le dépôt, ajoutez une photo et envoyez. Notre équipe interviendra rapidement.",
  },
  {
    question: "Dois-je être connecté pour signaler un problème ?",
    answer:
      "Oui, la connexion est requise pour garantir la fiabilité des signalements et permettre un suivi personnalisé.",
  },
  {
    question: "Comment suivre le traitement de mon signalement ?",
    answer:
      "Après avoir signalé, vous recevrez des notifications par email ou dans votre espace personnel sur l’avancement du traitement.",
  },
  {
    question: "Puis-je faire un don pour soutenir l’initiative ?",
    answer:
      "Oui, rendez-vous dans la section 'Dons' pour contribuer et soutenir l’amélioration de la gestion des déchets.",
  },
  {
    question: "Comment connaître les horaires de collecte dans mon quartier ?",
    answer:
      "Consultez la page 'Planing' pour voir les horaires et itinéraires de collecte des déchets dans votre ville.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 pt-28 pb-10 px-2">
       <div className=" py-8 px-6 text-center">
          <Heading
            title="Foire aux Questions"
            subTitle="Retrouvez ici les réponses aux questions les plus fréquentes sur l’utilisation de la plateforme EcoTrack."
          />
        </div>
      <section className="max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-0 overflow-hidden border border-green-100">
       
        <div className="p-8">
          <ul className="space-y-4">
            {faqList.map((faq, idx) => (
              <li key={idx} className="border-b border-green-100 pb-4">
                <button
                  className="w-full text-left flex justify-between items-center font-semibold text-green-800 text-lg focus:outline-none"
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                >
                  {faq.question}
                  <span className="ml-2 text-green-500 text-xl">
                    {openIndex === idx ? '−' : '+'}
                  </span>
                </button>
                {openIndex === idx && (
                  <div className="mt-2 text-gray-700 text-base animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Faqs;