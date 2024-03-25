import React from 'react';
import { ReservaForm } from '../../components/organisms';

export const CreateReserva = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Reserva</h1>
            <hr className='mt-3' />
            <ReservaForm />
        </div>
    );
}

