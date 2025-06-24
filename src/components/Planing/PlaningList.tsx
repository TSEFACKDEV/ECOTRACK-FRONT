import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Region {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface Neighborhood {
  id: number;
  name: string;
}

interface Schedule {
  id: number;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  routes: {
    id: number;
    date: string;
    startLocation: string;
    endLocation: string;
    truck: string;
    neighborhood: string;
  }[];
}

const PlanningList: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/eco/regions')
      .then(res => setRegions(res.data))
      .catch(err => console.error('Erreur chargement régions', err));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      axios.get(`http://localhost:5000/eco/cities/region/${selectedRegion}`)
        .then(res => setCities(res.data))
        .catch(err => console.error('Erreur chargement villes', err));
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost:5000/eco/neihborhood/${selectedCity}`)
        .then(res => setNeighborhoods(res.data))
        .catch(err => console.error('Erreur chargement quartiers', err));

      // Charger les plannings dès qu'une ville est sélectionnée
      axios.get(`http://localhost:5000/eco/schedules/filter?cityId=${selectedCity}`)
        .then(res => setSchedules(res.data))
        .catch(err => console.error('Erreur chargement plannings', err));
    } else {
      setNeighborhoods([]);
      setSchedules([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity && selectedNeighborhood) {
      axios.get(`http://localhost:5000/eco/schedules/filter?cityId=${selectedCity}&neighborhoodId=${selectedNeighborhood}`)
        .then(res => setSchedules(res.data))
        .catch(err => console.error('Erreur filtrage par quartier', err));
    }
  }, [selectedNeighborhood]);

  const filterOptions = (options: { id: number; name: string }[], search: string) =>
    options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="px-10 pt-4">

      <div className="flex justify-between">
        {/* Région */}
        <SearchableSelect
          label="Région"
          options={regions}
          onSelect={setSelectedRegion}
        />

        {/* Ville */}
        <SearchableSelect
          label="Ville"
          options={cities}
          onSelect={setSelectedCity}
        />

        {/* Quartier */}
        <SearchableSelect
          label="Quartier"
          options={neighborhoods}
          onSelect={setSelectedNeighborhood}
        />
      </div>

      <div>
        <h3>Résultats ({schedules.length})</h3>
        {schedules.map(s => (
          <div key={s.id}>
            <h4>{s.name}</h4>
            <p>Ville : {s.city}</p>
            <p>{s.startDate} → {s.endDate}</p>
            <ul>
              {s.routes.map(r => (
                <li key={r.id}>
                  {r.date} - {r.startLocation} → {r.endLocation} ({r.truck}) [{r.neighborhood}]
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant générique avec recherche insensible à la casse
interface SelectProps {
  label: string;
  options: { id: number; name: string }[];
  onSelect: (id: number | null) => void;
}

const SearchableSelect: React.FC<SelectProps> = ({ label, options, onSelect }) => {
  const [search, setSearch] = useState('');
  const filtered = options.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginBottom: '1rem' }} className="px-6 py-3 bg-green-500 rounded w-80 align">
      <label><strong>{label}</strong></label><br />
      <input
        type="text"
        placeholder={`Rechercher une ${label.toLowerCase()}`}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="hidden"
      />
      <select onChange={e => onSelect(Number(e.target.value) || null)}>
        <option value="">-- Sélectionner --</option>
        {filtered.map(opt => (
          <option key={opt.id} value={opt.id}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
};

export default PlanningList;
