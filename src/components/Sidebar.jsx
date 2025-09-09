import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="bg-light p-3 vh-100" style={{width: "200px"}}>
            <h5>Menu</h5>
            <ul className="list-unstyled">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/products">Produtos</Link></li>
            </ul>
        </div>
    );
}