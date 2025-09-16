import React, { useEffect, useState } from "react"
import { Form, Button } from 'react-bootstrap'
import api from "../services/api"
import { useNavigate, useParams } from "react-router-dom"

export default function ProductForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState({
        nome: '',
        preco: '',
        ativo: true,
        data_criação: new Date().toISOString().split("T")[0],
        data_atualizacao: new Date().toISOString().split("T")[0]
    })

    const generateFormattedId = async () => {
        try {
            const res = await api.get('/products')
            const total = res.data.length
            const nextNumber = total + 1
            const formattedId = nextNumber.toString().padStart(3, '0')
            return formattedId
        } catch (error) {
            console.error('Erro ao gerar ID:', error)
            return '001'
        }
    }

    useEffect(() => {
        if (id) {
            api.get(`/products/${id}`).then(res => setProduct(res.data))
        } else {
            generateFormattedId().then(formattedId => {
                setProducts(prev => ({
                    ...prev,
                    id: formattedId,
                    data_criacao: new Date().toISOString().split("T")[0]
                }))
            })
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setProducts({
            ...products,
            [name]: type === "checkbox" ? checked : value,
            data_atualizacao: new Date().toISOString().split("T")[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (id) {
                await api.put(`/products/${id}`, products)
            } else {
                await api.post("/products", products)
            }
            navigate("/products")
        } catch (error) {
            console.error('Erro ao salvar produto:', error)
        }
    }

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar produto" : "Novo produto"}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" value={products.nome}
                        onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" step="0.01" name="preco" value={products.preco}
                        onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Ativo" name="ativo" value={products.ativo}
                        onChange={handleChange} required />
                </Form.Group>

                <Button type="submit" variant="sucess">Salvar</Button>
            </Form>
        </div>
    )
}