import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ClienteForm = ({ cliente }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        cedula: cliente?.cedula ?? "",
        name: cliente?.name ?? "",
        email: cliente?.email ?? "",
        telefono: cliente?.telefono ?? "",
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
            console.log(cliente)
            if (cliente?.id) {
                await axios.post(
                    `http://localhost:8000/api/v1/cliente/${cliente.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `http://localhost:8000/api/v1/cliente/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/clientes');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
            <h1 className='text-gray-800 font-bold uppercase text-center text-xl mb-4'>
                {cliente?.id ? 'Edit' : 'Create'} Cliente
            </h1>

            {
                error && <p className='text-red-700 font-semibold text-xl'>All fields are required</p>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor='cedula'
                        className='text-gray-700 uppercase font-bold'>Cedula</label>
                    <input
                        id='cedula'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Cedula'
                        name='cedula'
                        value={form.cedula}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='name'
                        className='text-gray-700 uppercase font-bold'>Name</label>
                    <input
                        id='name'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Name'
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='email'
                        className='text-gray-700 uppercase font-bold'>Email</label>
                    <input
                        id='email'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Email'
                        name='email'
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Cmabiar a text */}

                <div>
                    <label
                        htmlFor='telefono'
                        className='text-gray-700 uppercase font-bold'>Telefono</label>
                    <input
                        id='telefono'
                        type="tel"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='Telefono'
                        placeholder='Phone Number'
                        value={form.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
            
                <input
                    type="submit" className='bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all'
                    value={cliente?.id ? 'Update' : 'Save'}
                />

            </form>
        </div>
    )
}


