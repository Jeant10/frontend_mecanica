
import React from 'react';
import { FaCarAlt } from "react-icons/fa";

export const Cover = () => {
  return (
    <>
      <div className='hidden md:flex justify-center items-center min-h-screen bg-gradient-to-r from-amber-500 to-amber-700'>
        <div className='text-center text-white space-y-3 p-8'>
          <div class="flex justify-center"> 
          <FaCarAlt size={70} />
          </div> 
          <h2 className='text-3xl font-extrabold'>Mecanica</h2>
          <p className='text-base'>Sistema Web para la Gestion de Vehiculos</p>
        </div>

      </div>
    </>
  )
}
