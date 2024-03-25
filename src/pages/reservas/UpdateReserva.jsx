import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReservaForm } from '../../components/organisms/ReservaForm';

export const UpdateReserva = () => {
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
                console.log(user);
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
            {
                Object.keys(reserva).length > 0 ?
                    (
                        <ReservaForm reserva={reserva} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this reserva</p>
                    )
            }
        </div>
    )
}


