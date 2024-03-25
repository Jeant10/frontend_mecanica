import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ReservaForm = ({ reserva }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        codigo: reserva?.codigo ?? "",
        descripcion: reserva?.descripcion ?? "",
        id_reserva: reserva?.id_reserva ?? "",
        id_vehiculo: reserva?.id_vehiculo ?? "",
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(form).includes("")) {
            console.log("error");
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
            return;
        }

        try {
            console.log(reserva)
            if (reserva?.id) {
                await axios.post(
                    `http://localhost:8000/api/v1/reserva/${reserva.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `http://localhost:8000/api/v1/reserva/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/reservas');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
            <h1 className='text-gray-800 font-bold uppercase text-center text-xl mb-4'>
                {reserva?.id ? 'Edit' : 'Create'} Reserva
            </h1>

            {
                error && <p className='text-red-700 font-semibold text-xl'>All fields are required</p>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor='codigo'
                        className='text-gray-700 uppercase font-bold'>Codigo</label>
                    <input
                        id='codigo'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Codigo'
                        name='codigo'
                        value={form.codigo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='descripcion'
                        className='text-gray-700 uppercase font-bold'>Descripcion</label>
                    <input
                        id='descripcion'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Descripcion'
                        name='descripcion'
                        value={form.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Cmabiar a text */}

                <div>
                    <label
                        htmlFor='id_cliente'
                        className='text-gray-700 uppercase font-bold'>id_cliente</label>
                    <input
                        id='id_cliente'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='id_cliente'
                        placeholder='Id cliente'
                        value={form.id_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='id_vehiculo'
                        className='text-gray-700 uppercase font-bold'>id_vehiculo</label>
                    <input
                        id='id_vehiculo'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='id_vehiculo'
                        placeholder='Id vehiculo'
                        value={form.id_vehiculo}
                        onChange={handleChange}
                        required
                    />
                </div>
            
                <input
                    type="submit" className='bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all'
                    value={reserva?.id ? 'Update' : 'Save'}
                />

            </form>
        </div>
    )
}


