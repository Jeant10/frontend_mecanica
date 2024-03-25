import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowVehiculo = () => {
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
            <p className='mt-3'>Vehiculo details</p>
            {
                Object.keys(vehiculo).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Marca: </span>
                                    {vehiculo.marca}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Modelo: </span>
                                    {vehiculo.modelo}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">Descripcion: </span>
                                    {vehiculo.descripcion}
                                </p>
                                {/* <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Phone Number: </span>
                                    {vehiculo.phone_number}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* State: </span>
                                    {vehiculo.state ? 'Active' : 'Inactive'}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Birthdate: </span>
                                    {vehiculo.birthdate ? vehiculo.birthdate : 'N/A'}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Home phone number: </span>
                                    {vehiculo.home_phone_number ? vehiculo.home_phone_number : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <img src={vehiculo.avatar} alt="avatar" className='h-80 w-80' />
                            </div> */}
                        </div> 
                    </div>

                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this vehiculo</p>
                    )
            }
        </div>
    )
}


