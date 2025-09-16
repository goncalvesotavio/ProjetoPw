import React, {useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import api from "../services/api";
import {useNavigate, useParams} from "react-router-dom";

export default function ProductForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState({
        nome:"",
        preco: "",
        ativo:true,
        data_criacao: new Date().toISOString().split("T")[0],
        data_atualizacao: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (id) {
            api.get(`/products/${id}`).then(res => setProducts(res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setProducts({...products,[name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(id) {
            await api.put(`/products/${id}`, products);
        } else {
            await api.post("/products", products);
        }
        navigate("/products");
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar Produto" : "Novo Produto"}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" value={products.nome}
                        onChange={handleChange} required/>
                </Form.Group>
                <FormGroup className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" step="0.01" name="preco" 
                    value={products.preco} onChange={handleChange} required/>
                </FormGroup>
                
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Ativo" name="ativo" 
                        checked={products.ativo} onChange={handleChange}/>
                </Form.Group>

                <Button type="submit" variant="success">Salvar</Button>
            </Form>
        </div>
    );
}