import React from 'react'
import HeroSection from '../../components/main/HeroSection'
import Mission from '../../components/main/Mission'
import ImpactSection from '../../components/main/ImpactSection'
import Actualite from '../../components/main/Actualite'
import NewsLater from '../../components/main/NewsLater'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Mission/>
      <ImpactSection/>
      <Actualite/>
      <NewsLater/>
    </div>
  )
}

export default Home