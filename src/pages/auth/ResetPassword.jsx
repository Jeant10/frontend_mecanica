import React from 'react'
import { useEffect, useState } from 'react';

import { Label, Button } from '../../components'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const ResetPassword = () => {

    const {search} = useLocation();
    const query = new URLSearchParams(search);

    const token = query.get("token");
    const email = query.get("email");

    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const navigate = useNavigate();

    const resetpassword = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/reset-password',
                { token, email, password, password_confirmation},
                { headers: { 'accept': 'application/json' } }
            )

            console.log(response)

            navigate(`/*`)

        } catch (error) {
            console.log(error.response, 'error');
        }
    }

  return (
    <>
        <h2 className='text-2xl md:text-3xl font-bold'>Reset Password</h2>
        <p className='text-sm text-gray-500 pb-6'>Now you can change your passwor, make sure it is secure</p>
        <form className='space-y-7 text-left' onSubmit={resetpassword}>
            <div>
                <Label description="Password" htmlFor='password' />
                <input
                    className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    placeholder='Enter your new password'
                    required
                    autoFocus
                    onChange={e => setPassword(e.target.value)}
                />

            </div>

            <div>
                
                <Label description="Confirm Password" htmlFor='password_confirmation' />
                <input
                    className='rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:border-cyan-500 disabled:opacity-50 block mt-2 w-full'
                    id='password_confirmation'
                    name='password_confirmation'
                    type='password'
                    value={password_confirmation}
                    placeholder='Enter your new password again'
                    required
                    autoFocus
                    onChange={e => setPassword_confirmation(e.target.value)}
                />

            </div>

            <div className="mt-4 flex justify-center">

                <Button name='Reset' styles='w-3/5'/>

            </div>

        </form>
    </>
  )
}

export default ResetPassword