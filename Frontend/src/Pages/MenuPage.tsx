import MenuCard from "../Components/MenuCard"
import Navbar from "../Components/Navbar"
import { Toaster } from "react-hot-toast"

export const MenuPage = () => {
    return(
        <div>
            <Navbar/>
            <Toaster position="bottom-right" />
            <MenuCard/>
        </div>
    )
}