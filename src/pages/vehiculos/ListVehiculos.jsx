import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ListVehiculos = () => {

  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const token = localStorage.getItem('token');

  const getVehiculos = async () => {
    try {

      const response = await axios.get(
        'http://localhost:8000/api/v1/vehiculo',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.users)
      setVehiculos(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteVehiculo = async (id) => {
    try {

      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?")
      if (confirmation) {
        await axios.get(
          `http://localhost:8000/api/v1/vehiculo/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getVehiculos();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVehiculos();
  }, [])

  return (
    <div>
      <h1 className='font-black text-4xl text-cyan-500'>Vehiculos</h1>
      <hr className='mt-3' />
      <p className='mt-3'>List of created vehiculos</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>Marca</th>
            <th className='p-2'>Modelo</th>
            <th className='p-2'>Descripcion</th>
            <td className='p-2'></td>
          </tr>
        </thead>
        <tbody>
          {
            vehiculos.map((vehiculo, index) => (
              <tr key={vehiculo.id} className="border-b hover:bg-gray-100">
                <td className='p-3'>{++index}</td>
                <td className='p-3'>{vehiculo.marca}</td>
                <td className='p-3'>{vehiculo.modelo}</td>
                <td className='p-3'>{vehiculo.descripcion}</td>
                {/* <td className='p-3'>
                {vehiculo.state ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-900 font-bold">
                  <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                  :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-red-900 font-bold">
                    <path d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                
                }</td> */}
                <td className='p-3'>
                  <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                    onClick={() => navigate(`/vehiculos/show/${vehiculo.id}`)}>Show</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/vehiculos/edit/${vehiculo.id}`)}>Edit</button>
                  
                  <button type='button' className={`${vehiculo.state ? 'bg-red-800' : 'bg-green-800 '} block w-full text-white p-2 uppercase font-bold text-xs rounded-xl`}
                    onClick={() => { deleteVehiculo(vehiculo.id) }}>{vehiculo.state ? 'Inactive' : 'Active'}</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


