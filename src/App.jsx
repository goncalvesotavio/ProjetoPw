import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppNavbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Products from "./pages/Products.jsx"
import ProductForm from "./components/ProductForm.jsx"

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App