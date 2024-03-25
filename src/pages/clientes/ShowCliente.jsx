import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getCliente = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/Cliente/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setCliente(user);
            } catch (error) {
                console.log(error);
            }
        }
        getCliente()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Cliente</h1>
            <hr className='mt-3' />
            <p className='mt-3'>Cliente details</p>
            {
                Object.keys(cliente).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Cedula: </span>
                                    {cliente.cedula}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Name: </span>
                                    {cliente.name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Email: </span>
                                    {cliente.email}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Telefono: </span>
                                    {cliente.telefono}
                                </p>
                            </div>
                            <div>
                                <img src={cliente.avatar} alt="avatar" className='h-80 w-80' />
                            </div>
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this cliente</p>
                    )
            }
        </div>
    )
}


