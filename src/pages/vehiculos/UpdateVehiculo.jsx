import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VehiculoForm } from '../../components/organisms/VehiculoForm';

export const UpdateVehiculo = () => {
    const { id } = useParams();
    const [vehiculo, setVehiculo] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getVehiculo = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/vehiculo/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setVehiculo(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getVehiculo()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Vehiculo</h1>
            <hr className='mt-3' />
            {
                Object.keys(vehiculo).length > 0 ?
                    (
                        <VehiculoForm vehiculo={vehiculo} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this vehiculo</p>
                    )
            }
        </div>
    )
}


