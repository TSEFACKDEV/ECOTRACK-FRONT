import React from "react";

interface HeadingProps {
  title: string;
  subTitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle }) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h1
        className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in"
        style={{ letterSpacing: "0.05em" }}
      >
        {title}
      </h1>
      <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 rounded-full my-4 animate-grow" />
      <p className="text-center text-lg md:text-xl text-gray-600 max-w-xl animate-fade-in-slow">
        {subTitle}
      </p>
    </div>
  );
};

export default Heading;

