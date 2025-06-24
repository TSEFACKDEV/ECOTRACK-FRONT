import React from 'react'

interface PlaningCardProps {
    name: string;
    startDate: string;
    endDate: string;
}

const PlaningCard: React.FC<PlaningCardProps> = ({name, startDate, endDate}) => {
  return (
    <div>
        <h3>{name}</h3>
        <p>{startDate} - {endDate}</p>
    </div>
  )
}

export default PlaningCard