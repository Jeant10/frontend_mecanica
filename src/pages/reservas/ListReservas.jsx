import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ListReservas = () => {

  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');

  const getReservas = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/v1/reserva',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.users)
      setReservas(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteReserva = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?")
      if (confirmation) {
        await axios.get(
          `http://localhost:8000/api/v1/reserva/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getReservas();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReservas();
  }, [])

  return (
    <div>
      <h1 className='font-black text-4xl text-sky-900'>Reservas</h1>
      <hr className='mt-3' />
      <p className='mt-3'>List of created Reservas</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>codigo</th>
            <th className='p-2'>descripcion</th>
            <th className='p-2'>id_cliente</th>
            <th className='p-2'>id_vehiculo</th>
            <td className='p-2'></td>
          </tr>
        </thead>
        <tbody>
          {
            reservas.map((reserva, index) => (
              <tr key={reserva.id} className="border-b hover:bg-gray-100">
                <td className='p-3'>{++index}</td>
                <td className='p-3'>{reserva.codigo}</td>
                <td className='p-3'>{reserva.descripcion}</td>
                <td className='p-3'>{reserva.id_cliente}</td>
                <td className='p-3'>{reserva.id_vehiculo}</td>
                <td className='p-3'>
                  <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                    onClick={() => navigate(`/reservas/show/${reserva.id}`)}>Show</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/reservas/edit/${reserva.id}`)}>Edit</button>
                  
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


