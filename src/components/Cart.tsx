import React from 'react'
import { FaArrowRight, FaRegImage } from 'react-icons/fa'
import { Link } from 'react-router'

export interface CartProps {
  img: string
  title: string
  description: string
  link: string
  label?: string
}


const Cart: React.FC<CartProps> = ({ img, title, description, link, label }) => {
  return (
    <div className="h-full flex flex-col pb-4 bg-gradient-to-br from-white via-[#f0fdfa] to-[#d1fae5] shadow-2xl rounded-3xl overflow-hidden transition-transform hover:-translate-y-3 hover:scale-105 hover:shadow-3xl duration-300 border border-[#10B981]/10">
      <div className="relative w-full h-[210px] bg-gradient-to-tr from-[#e0f2fe] to-[#bbf7d0] flex items-center justify-center overflow-hidden group">
        {img ? (
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={img}
            alt={title}
          />
        ) : (
          <FaRegImage className="text-gray-300 text-7xl" />
        )}
        <div className="absolute top-4 left-4 bg-white/90 rounded-full p-3 shadow-lg flex items-center justify-center">
          <FaRegImage className="text-[#10B981] text-2xl" />
        </div>
      </div>
      <div className="px-7 py-5 flex flex-col flex-1">
        <h3 className="flex items-center gap-3 text-2xl font-bold text-[#047857] mb-2 tracking-wide">
          <span className="bg-[#d1fae5] rounded-full p-2">
            <FaRegImage className="text-[#10B981] text-xl" />
          </span>
          <span className="flex-1">{title}</span>
        </h3>
        <p className="text-gray-700 text-base mb-8 text-center flex-1 italic">{description}</p>
        <Link
          to={link}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 mt-auto"
        >
          <span className="text-lg">{label}</span>
          <FaArrowRight className="text-xl" />
        </Link>
      </div>
    </div>
  )
}


export default Cart