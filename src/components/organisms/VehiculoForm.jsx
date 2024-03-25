import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const VehiculoForm = ({ vehiculo }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        marca: vehiculo?.marca ?? "",
        modelo: vehiculo?.modelo ?? "",
        descripcion: vehiculo.descripcion ?? "",
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
            console.log(vehiculo)
            if (vehiculo?.id) {
                await axios.post(
                    `http://localhost:8000/api/v1/vehiculo/${vehiculo.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `http://localhost:8000/api/v1/vehiculo/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/vehiculos');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
            <h1 className='text-sky-900 font-bold uppercase text-center text-xl mb-4'>
                {vehiculo?.id ? 'Edit' : 'Create'} Vehiculo
            </h1>

            {
                error && <p className='text-red-700 font-semibold text-xl'>All fields are required</p>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor='marca'
                        className='text-gray-700 uppercase font-bold'>Marca</label>
                    <input
                        id='marca'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Marca'
                        name='marca'
                        value={form.marca}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='modelo'
                        className='text-gray-700 uppercase font-bold'>Modelo</label>
                    <input
                        id='modelo'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Modelo'
                        name='modelo'
                        value={form.modelo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='description'
                        className='text-gray-700 uppercase font-bold'>Description</label>
                    <textarea
                        id='description'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='description'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>


                {/* <div>
                    <label
                        htmlFor='email'
                        className='text-gray-700 uppercase font-bold'>Email</label>
                    <input
                        id='email'
                        type="email"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='personal_phone'
                        className='text-gray-700 uppercase font-bold'>Phone Number</label>
                    <input
                        id='personal_phone'
                        type="tel"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='personal_phone'
                        placeholder='Phone Number'
                        value={form.personal_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='home_phone'
                        className='text-gray-700 uppercase font-bold'>Home Number</label>
                    <input
                        id='home_phone'
                        type="tel"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='home_phone'
                        placeholder='Home Number'
                        value={form.home_phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='address'
                        className='text-gray-700 uppercase font-bold'>Address</label>
                    <textarea
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Address'
                        name='address'
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </div> */}

                <input
                    type="submit" className='bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all'
                    value={vehiculo?.id ? 'Update' : 'Save'}
                />

            </form>
        </div>
    )
}


