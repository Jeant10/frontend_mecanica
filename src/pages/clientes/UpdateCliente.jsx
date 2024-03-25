import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClienteForm } from '../../components/organisms/ClienteForm';

export const UpdateCliente = () => {
    
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getCliente = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/cliente/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setCliente(user);
                console.log(user);
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
            {
                Object.keys(cliente).length > 0 ?
                    (
                        <ClienteForm cliente={cliente} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this Cliente</p>
                    )
            }
        </div>
    )
}


