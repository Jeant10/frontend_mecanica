import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowReserva = () => {
    const { id } = useParams();
    const [reserva, setReserva] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getReserva = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/reserva/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setReserva(user);
            } catch (error) {
                console.log(error);
            }
        }
        getReserva()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Reserva</h1>
            <hr className='mt-3' />
            <p className='mt-3'>Reserva details</p>
            {
                Object.keys(reserva).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Codigo:  </span>
                                    {reserva.codigo}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Descripcion: </span>
                                    {reserva.descripcion}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">id_cliente: </span>
                                    {reserva.id_cliente}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">id_vehiculo: </span>
                                    {reserva.id_reserva}
                                </p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this reserva</p>
                    )
            }
        </div>
    )
}


