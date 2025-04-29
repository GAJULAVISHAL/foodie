import prisma from "../lib/prisma";
export async function  AddItem(req: any, res: any) {
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const menuItem = await prisma.menuItem.create({
            data: {
                name: body.name,
                price: body.price,
                category: body.category,
            },
        });
        if (!menuItem) {
            return res.status(500).json({ message: "Failed to add item" });
        }
        return res.status(200).json({ message: "Item added successfully", item: menuItem });
    } catch (error) {
        console.error("Error adding item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function UpdateItem(req: any, res: any) {
    try{
        const body = req.body;
        if (!body) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const UpdatedMenuItem = await prisma.menuItem.update({
            where: {
                id: body.id,
            },
            data: {
                name: body.name,
                price: body.price,
                category: body.category,
            },
        });
        if (!UpdatedMenuItem) {
            return res.status(500).json({ message: "Failed to update item" });
        }
        return res.status(200).json({ message: "Item updated Item successfully", item: UpdatedMenuItem });
    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function DeleteItem(req: any, res: any) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const DeletedMenuItem = await prisma.menuItem.delete({
            where: {
                id: id,
            },
        });
        if (!DeletedMenuItem) {
            return res.status(500).json({ message: "Failed to delete item" });
        }
        return res.status(200).json({ message: "Item deleted successfully", item: DeletedMenuItem });
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export async function GetItems(req: any, res: any) {
    try {
        const menuItems = await prisma.menuItem.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                category: true
            }
        });
        if (!menuItems) {
            return res.status(500).json({ message: "Failed to get items" });
        }
        return res.status(200).json({ message: "Items fetched successfully", items: menuItems });
    } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}