import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label, Button } from '../../components'
import axios from 'axios';


const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const onLogin = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/forgot-password',
                { email},
                { headers: { 'accept': 'application/json' } }
            )

            console.log(response)
            setMessage(response.data.message)

        } catch (error) {
            console.log(error.response, 'error');
            setEmail('');
        }
    }

  return (
    <>

        <main className="max-w-md w-full h-auto px-4">

                <div className="text-center space-y-2">

                    <h2 className="text-2xl md:text-3xl font-bold">
                        Forgot Password
                    </h2>


                    <p className="text-sm text-gray-500">
                        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                    </p>

                </div>

                <div className="mb-4">

                        <div className="mt-3 list-disc list-inside text-sm text-emerald-500">

                            <div>{message}</div>

                        </div>

                </div>

                <div className="mt-6">

                    <form method="POST" className="space-y-6" onSubmit={onLogin}>

                        <div>
                            <Label description="Email address" htmlFor='email' />
  
                            <input
                                className="rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:ring-0 focus:border-indigo-500 disabled:opacity-50 block mt-2 w-full" 
                                id="email" 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                value={email}
                                required
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                            ></input>

                        </div>

                        <div className="mt-4 flex justify-center">

                            <Button name='Request link' styles='w-3/5'/>

                        </div>

                        <div className="mt-4 flex flex-col items-center justify-center text-md text-gray-500">

                            <span>Already have an account?</span>

                            <button className="text-sm text-cyan-500 hover:text-violet-500 text-base font-semibold" onClick={() => navigate(`/login`)}>
                                Sign in
                            </button>

                        </div>

                    </form>

                </div>

            </main>

    </>
  )
}

export default ForgotPassword