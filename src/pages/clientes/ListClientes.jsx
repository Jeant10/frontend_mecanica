import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ListClientes = () => {

  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const token = localStorage.getItem('token');

  const getClientes = async () => {
    try {
      const response = await axios.get(
        '',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.users)
      setClientes(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCliente = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?")
      if (confirmation) {
        await axios.get(
          ``,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getClientes();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getClientes();
  }, [])

  return (
    <div>
      <h1 className='font-black text-4xl text-sky-900'>Clientes</h1>
      <hr className='mt-3' />
      <p className='mt-3'>List of created clientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>Cedula</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Telefono</th>
            <td className='p-2'></td>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map((cliente, index) => (
              <tr key={cliente.id} className="border-b hover:bg-gray-100">
                <td className='p-3'>{++index}</td>
                <td className='p-3'>{cliente.cedula}</td>
                <td className='p-3'>{cliente.name}</td>
                <td className='p-3'>{cliente.email}</td>
                <td className='p-3'>{cliente.telefono}</td>
                <td className='p-3'>
                  <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                    onClick={() => navigate(`/clientes/show/${cliente.id}`)}>Show</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/clientes/edit/${cliente.id}`)}>Edit</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


