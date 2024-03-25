import React from 'react';
import { ClienteForm } from '../../components/organisms';

export const CreateCliente = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Cliente</h1>
            <hr className='mt-3' />
            <ClienteForm />
        </div>
    );
}

