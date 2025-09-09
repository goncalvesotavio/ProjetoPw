import React, { useEffect, useState } from "react";
import api from "../services/api";
import $ from "jquery";
import "datatables.net";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);
    const navigate = UseNavigate();

    const loadProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
        $("#productsTable").DataTable();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (window.confirm("Deseja deletar este produto?")) {
            await api.delete(`/products/${id}`);
            loadProducts();
        }
    };

    
}