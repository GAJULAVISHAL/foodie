import prisma from "../lib/prisma";
export async function PlaceOrder(req: any, res: any) {
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const order = await prisma.order.create({
            data: {
                totalAmount : body.totalAmount,
                mobileNumber: body.mobileNumber,
                orderItems: {
                    create: body.Items.map((item: any) => ({
                        menuItemId: item.id,
                        quantity: item.quantity,
                    })),
                },
            },
        });
        if (!order) {
            return res.status(500).json({ message: "Failed to place order" });
        }
        return res.status(200).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function GetOrders(req: any, res: any) {
    try{
        const mobileNumber = req.params.mobileNumber;
        const orders = await prisma.order.findMany({
            where:{
                mobileNumber: mobileNumber,
            },select:{
                id:true,
                totalAmount:true,
                createdAt:true,
                orderItems:{
                    select:{
                        menuItem:{
                            select:{
                                name:true
                            }
                        },
                        quantity:true,
                    }
                }
            }
        })
        if (!orders) {
            return res.status(500).json({ message: "Failed to get orders" });
        }
        return res.status(200).json({ message: "Orders fetched successfully", orders });    
    }catch(error){
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}