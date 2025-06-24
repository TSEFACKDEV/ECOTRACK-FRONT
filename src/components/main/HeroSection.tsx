import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiAlertTriangle, FiHeart, FiMapPin } from 'react-icons/fi';
import depot from '../../images/hero/depot.jpeg'
import colecte from '../../images/hero/colecte.jpeg'
import don from '../../images/hero/dons.jpeg'
import { link } from 'framer-motion/client';
import { Link } from 'react-router';
const HeroSection = () => {
  // Données pour les slides spécifiques à la gestion des déchets
  const slides = [
    {
      id: 1,
      title: "Ensemble pour un Cameroun plus propre",
      subtitle: "Signalement des dépôts sauvages",
      description: "Signalez les dépôts d'ordures non collectés dans votre quartier et contribuez à l'assainissement de notre environnement.",
      image: depot,
      ctaText: "Signaler un dépôt",
      icon: <FiAlertTriangle className="inline mr-2" />,
      link: "/signalement"
    },
    {
      id: 2,
      title: "Conseils Ecologique",
      subtitle: "Découvrer les méthodes et astuces de gestion des déchet ménager",
      description: "Votre participation permet d'améliorer nos services de collecte et de traitement des déchets dans tout le Cameroun.",
      image: don,
      ctaText: "Découvrez les conseils",
      icon: <FiHeart className="inline mr-2" />,
      link: "/dons"
    },
    {
      id: 3,
      title: "Nos points de collecte",
      subtitle: "Trouvez le centre le plus proche",
      description: "Localisez les centres de collecte et de tri des déchets dans votre ville et respectez les horaires de passage des camions.",
      image: colecte,
      ctaText: "Consulter le planing",
      icon: <FiMapPin className="inline mr-2" />,
      link: "/planing"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Gestion du slider automatique
  useEffect(() => {
    let intervalId: number;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 6000); // Changement toutes les 6 secondes
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Fond du slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-green-900 bg-opacity-50"></div>
          </div>
        ))}
      </div>

      {/* Contenu de la hero section */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >
          <p className="text-lg sm:text-xl font-medium text-green-300 mb-2">
            {slides[currentSlide].subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            {slides[currentSlide].description}
          </p>
          <Link to={slides[currentSlide].link} className="btn">
            {slides[currentSlide].icon}
            {slides[currentSlide].ctaText}
          </Link>
        </motion.div>

        {/* Indicateurs de position */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 12000);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Boutons de navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
          aria-label="Slide précédent"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
          aria-label="Slide suivant"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;