import React from 'react';
import { VehiculoForm } from '../../components/organisms';

export const CreateVehiculo = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-cyan-500'>Vehiculo</h1>
            <hr className='mt-3' />
            <VehiculoForm />
        </div>
    );
}
