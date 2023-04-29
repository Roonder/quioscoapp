import useSWR from 'swr';
import axios from 'axios';
import AdminLayout from "@/layout/adminLayout";
import Orden from '@/components/Orden';

const Admin = () => {
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data);
    const {data, error, isLoading} = useSWR('/api/ordenes', fetcher, {refreshInterval: 100});
    

    return (
        <AdminLayout
            pagina="Administración"
        >
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra los pedidos</p>

            {data && data.length ? data.map(orden => (
                <Orden
                    key={orden.id}
                    orden={orden}
                />
            )) : <p>No hay órdenes pendientes.</p> }
            
        </AdminLayout>
    );
}
 
export default Admin;