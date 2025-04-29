import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MenuPage } from "./Pages/MenuPage"
import { CartProvider } from "./Hooks/CartContext"
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
