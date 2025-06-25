import React, { useEffect, useState } from 'react';
import {  FiMapPin, FiFilter, FiRefreshCw } from 'react-icons/fi';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import jsPDF from "jspdf";
import Heading from '../../components/Heading';

interface Planning {
  id: string;
  pointName: string;
  city: string;
  neighborhood: string;
  collectionDate: string;
  duration: number;
  frequency: string;
}

const PlanningPage = () => {
  const [plannings, setPlannings] = useState<Planning[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    neighborhood: '',
    date: ''
  });
  const [cities, setCities] = useState<string[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);

  useEffect(() => {
    fetchPlannings();
    fetchLocations();
  }, []);

  const fetchPlannings = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.neighborhood) params.append('neighborhood', filters.neighborhood);
      if (filters.date) params.append('date', filters.date);

      const response = await api.get(`/planning?${params.toString()}`);
      setPlannings(response.data.data);
    } catch (error) {
      toast.error('Veuillez vous connecter pour voir le planning de collecte.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    const response = await api.get('/planning');
    const allPlannings = response.data.data;
    
    const uniqueCities = [...new Set(allPlannings.map((p: Planning) => p.city))];
    const uniqueNeighborhoods = [...new Set(allPlannings.map((p: Planning) => p.neighborhood))];
    
    setCities(uniqueCities as string[]);
    setNeighborhoods(uniqueNeighborhoods as string[]);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    setLoading(true);
    fetchPlannings();
  };

  const resetFilters = () => {
    setFilters({ city: '', neighborhood: '', date: '' });
    fetchPlannings();
  };

  const logoUrl = "/logo-ecotrack.png"; // Place ce fichier dans public/

  const downloadPDF = async () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });

    // Ajout du logo (chargement asynchrone)
    const img = new Image();
    img.src = logoUrl;
    await new Promise(resolve => { img.onload = resolve; });

    // Logo + titre
     doc.addImage(img, "PNG", 40, 30, 50, 50); // x, y, width, height
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor("#10B981");
    doc.text("Eco", 100, 60);
    doc.setTextColor("#222");
    doc.setFont("helvetica", "bold");
    doc.text("Track", 145, 60);

    // Sous-titre
    doc.setFontSize(16);
    doc.setTextColor("#10B981");
    doc.text("Planning de Collecte des Déchets", 40, 100);

    // Tableau
    doc.setFontSize(11);
    doc.setTextColor("#222");
    const headers = ["Point de Collecte", "Localisation", "Date/Heure", "Durée", "Fréquence"];
    const startY = 130;
    let y = startY;

    // En-têtes
    headers.forEach((h, i) => {
      doc.setFillColor("#E0F2F1");
      doc.rect(40 + i * 150, y, 140, 24, "F");
      doc.setTextColor("#10B981");
      doc.text(h, 50 + i * 150, y + 16);
    });

    y += 32;

    // Lignes du tableau
    plannings.forEach((p, idx) => {
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? "#F9F9F9" : "#FFFFFF");
      for (let i = 0; i < headers.length; i++) {
        doc.rect(40 + i * 150, y, 140, 22, "F");
      }
      doc.setTextColor("#222");
      doc.text(p.pointName, 50, y + 15);
      doc.text(`${p.neighborhood}, ${p.city}`, 200, y + 15);
      doc.text(new Date(p.collectionDate).toLocaleString('fr-FR'), 350, y + 15);
      doc.text(`${p.duration} min`, 500, y + 15);
      doc.text(p.frequency, 650, y + 15);
      y += 24;
      if (y > 520) { // Nouvelle page si trop long
        doc.addPage();
        y = 60;
      }
    });

    // Pied de page
    doc.setFontSize(10);
    doc.setTextColor("#888");
    doc.text(`© ${new Date().getFullYear()} EcoTrack – Gestion des collectes de dechets`, 40, 570);

    doc.save("planning-collecte.pdf");
  };

  return (
    <div className="min-h-screen bg-green-50/20 pt-24 pb-10 px-2">
      <div className="max-w-6xl mx-auto">
        <Heading title=' Planning de Collecte des Déchets' subTitle='Consultez le planning de collecte des déchets pour votre ville.' />
        
        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Toutes les villes</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
              <select
                name="neighborhood"
                value={filters.neighborhood}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Tous les quartiers</option>
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div className="flex items-end gap-2">
              <button
                onClick={applyFilters}
                className="btn1 flex items-center gap-2"
              >
                <FiFilter /> Filtrer
              </button>
              <button
                onClick={resetFilters}
                className="btn2 flex items-center gap-2"
              >
                <FiRefreshCw /> Réinitialiser
              </button>
            </div>
          </div>
        </div>
        
        {/* Tableau des plannings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Chargement en cours...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Point de Collecte</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Heure</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durée</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fréquence</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {plannings.map((planning) => (
                    <tr key={planning.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{planning.pointName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FiMapPin className="text-green-600" />
                          {planning.neighborhood}, {planning.city}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(planning.collectionDate).toLocaleString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{planning.duration} min</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {planning.frequency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bouton Télécharger PDF */}
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            className="flex items-center mt-2 gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Télécharger le Planning en PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;