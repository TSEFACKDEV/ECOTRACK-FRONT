import React from "react";
import Heading from "../Heading";
import type { CartProps } from "../Cart";
import depot from "../../images/mission/signaler.jpeg";
import soutient from "../../images/mission/soutient.jpeg";
import planing from "../../images/mission/planing.jpg";
import Cart from "../Cart";

const missions: CartProps[] = [
  {
    img: depot,
    title: "Signaler les dépots sauvages ",
    description:
      "contribuez à la propreté dans votre ville en signalent les dépots d'ordures abandonnées. Ajoutez des photos et une description précise pour faciliter l'intervention.",
    link: "/signalement",
    label: "signaler",
  },
  {
    img: soutient,
    title: "soutenez Hysacam",
    description:
      "Vos dons permettent de financer des équipement suplémentaire et d'améliorer les services de collecte des déchets dans votre quartier",
    link: "/dons",
    label: "faire un don",
  },
  {
    img: planing,
    title: " consulter le planing",
    description:
      "rester informer des horaire et des itinéraire de collecte des déchets dans votre quartier. planifier vos sorties d'ordures par conséquence.",
    link: "/planing",
    label: "voir le planing",
  },
];

const Mission = () => {
  return (
    <div className="my-[50px] flex justify-between  items-center flex-col px-4 min-h-[100vh] p-12 ">
      <Heading
        title="Notre Mission"
        subTitle="EcoTrack est une initiative citoyenne en partenaria avec l'agence hysacam pour amélioré la qualité de vie dans nos ville "
      />
      <div className=" mx-auto grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {missions.map((mission, index) => (
          <Cart
            key={index}
            img={mission.img}
            title={mission.title}
            description={mission.description}
            label={mission.label}
            link={mission.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Mission;
