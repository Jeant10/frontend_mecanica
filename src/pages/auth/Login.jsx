import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button } from '../../components'
import { AuthContext } from '../../contexts';
import { Link } from 'react-router-dom';

export const Login = () => 
{
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/login',
                { email, password },
                { headers: { 'accept': 'application/json' } }
            )
            const {access_token, token_type, user} = response.data.data 
            login(user, `${token_type} ${access_token}`);   
            navigate('/');       
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
            <h2 className='text-2xl md:text-3xl font-bold'>Bienvenido</h2>
            <p className='text-sm text-gray-500 pb-6'>Ingresa con tu cuenta</p>
            <form className='space-y-7 text-left' onSubmit={onLogin}>
                <div>
                    <Label description="Email" htmlFor='email' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-amber-500 disabled:opacity-50 block mt-2 w-full'
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        placeholder='Ingresa tu email'
                        maxLength="35"
                        required
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label description="Contraseña" htmlFor='password' />
                    <input
                        className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-amber-500 disabled:opacity-50 block mt-2 w-full'
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        placeholder='Ingresa tu contraseña'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {/* <div>

                    <Link type = "button" to ={"/forgot-password"} className="text-sm text-blue-600 hover:text-pink-700 px-2">
                            Perdiste tu contrasela?
                    </Link>

                </div> */}

                <div className='pt-4 flex justify-center'>
                    <Button name='Log in' styles='w-3/5' />
                </div>
            </form>
        </>
    );
}


