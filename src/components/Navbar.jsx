import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function AppNavbar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>📦 CRUD Produtos</Navbar.Brand>
            </Container>
        </Navbar>
    );
}