import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Card, Button } from "react-bootstrap";
import { FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/products").then(res => setTotal(res.data.length));
    }, []);

    return (
        <div className="container mt-4">
            <Card className="p-3 shadow">
                <div className="d-flex align-items-center">
                    <FaBox size={40} className="me-3/" />
                    <div>
                        <h5>Total de Produtos</h5>
                        <h2>{total}</h2>
                        <Button variant="primary" onClick={() => navigate("/products")}>
                            Visualizar
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}