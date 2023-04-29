import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);
    const router = useRouter();

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias');
        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal);
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }
    
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        console.log(producto);
        if(pedido.some(productoState => productoState.id === producto.id)) {
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
            setPedido(pedidoActualizado);
            toast.success('Guardado correctamente');
        } else {
            setPedido([...pedido, producto]);
            toast.success('Agregado correctamente al pedido')
        }

        setModal(false);
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id);
        setProducto(productoActualizar[0]);
        setModal(true);
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);

    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()});
            // Resetear la APP
            toast.success('Pedido realizado correctamente')
            setTimeout(() => {
                setCategoriaActual(categorias[0]);
                setPedido([]);
                setNombre('');
                setTotal(0);
                router.push('/');
            }, 15e2);

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                modal,
                producto,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                colocarOrden,
                total,
                nombre,
                setNombre
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
}

export {
    QuioscoProvider
}

export default QuioscoContext;