import React from 'react'
import PlaningList from '../../components/Planing/PlaningList';

const Planing = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 pt-24 bg-gradient-to-br from-green-50 via-white to-green-100">
        <h1 className="mb-4 text-4xl font-extrabold text-center text-green-700 drop-shadow-lg">
          Planings de collecte
        </h1>       
        < PlaningList />
    </div>
  )
}

export default Planing