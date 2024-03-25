import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Login, App } from '../pages';
import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardTemplate } from '../components/templates/DashboardTemplate';


import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';


import { ListVehiculos } from '../pages/vehiculos/ListVehiculos';
import { ShowVehiculo } from '../pages/vehiculos/ShowVehiculo';
import { CreateVehiculo, UpdateVehiculo } from '../pages/vehiculos';

import { ListClientes } from '../pages/clientes/ListClientes';
import { ShowCliente } from '../pages/clientes/ShowCliente';
import { CreateCliente, UpdateCliente } from '../pages/clientes';

import { ListReservas } from '../pages/reservas/ListReservas';
import { ShowReserva} from '../pages/reservas/ShowReserva';
import { CreateReserva, UpdateReserva } from '../pages/reservas';

export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                <Route element={<AuthTemplate />}>
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                </Route>

                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                                <Route element={<DashboardTemplate/>}>

                                    <Route index path='/' element={<App />} />

                                    <Route index path='/vehiculos' element={<ListVehiculos/>} />
                                    <Route index path='/vehiculos/show/:id' element={<ShowVehiculo />} />
                                    <Route index path='/vehiculos/create' element={<CreateVehiculo />} />
                                    <Route index path='/vehiculos/edit/:id' element={<UpdateVehiculo />} />


                                    <Route index path='/clientes' element={<ListClientes/>} />
                                    <Route index path='/clientes/show/:id' element={<ShowCliente />} />
                                    <Route index path='/clientes/create' element={<CreateCliente />} />
                                    <Route index path='/clientes/edit/:id' element={<UpdateCliente />} />
                                    
                                    <Route index path='/reservas' element={<ListReservas/>} />
                                    <Route index path='/reservas/show/:id' element={<ShowReserva />} />
                                    <Route index path='/reservas/create' element={<CreateReserva />} />
                                    <Route index path='/reservas/edit/:id' element={<UpdateReserva />} />

                                </Route>
                        </Routes>

                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
