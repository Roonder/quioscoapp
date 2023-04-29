import { useEffect, useState, useCallback } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";
import Layout from "@/layout/layout";


const Total = () => {
    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco();

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])

    
    return (
        <Layout
            pagina="Total y Confirmar Pedido"
        >
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>

                    <input type="text" 
                        className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p>Total a pagar: <span className="font-bold text-amber-500">{formatearDinero(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input
                        type="submit"
                        value="Confirmar Pedido"
                        className={"bg-indigo-600 hover:bg-indigo-800 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center disabled:bg-indigo-300 disabled:cursor-not-allowed cursor-pointer"}
                        disabled={comprobarPedido()}

                    />
                </div>
            </form>

        </Layout>
    );
}
 
export default Total;