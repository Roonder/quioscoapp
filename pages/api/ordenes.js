import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

    const prisma = new PrismaClient();

    // Obtener Ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    });
    res.status(200).json(ordenes);

    // Crear Ordenes
    if(req.method === "POST" ) {
        const body = req.body

        const orden = await prisma.orden.create({
            data:{
                nombre: body.nombre,
                total: body.total,
                pedido: body.pedido,
                fecha: body.fecha
            }
        })
        res.status(200).json(orden);
    }

}