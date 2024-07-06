import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Clientes from "./pages/Cliente/ConsultarCliente";
import NovoCliente from "./pages/Cliente/NovoCliente";
import DeletarCliente from "./pages/Cliente/DeletarCliente";
import ModificarCliente from "./pages/Cliente/ModificarCliente";
import Produtos from "./pages/Produto/ConsultarProduto";
import NovoProduto from "./pages/Produto/NovoProduto";
import DeletarProduto from "./pages/Produto/DeletarProduto";
import ModificarProduto from "./pages/Produto/ModificarProduto";
import Unidades from "./pages/Unidade/ConsultarUnidade";
import NovoUnidade from "./pages/Unidade/NovoUnidade";
import DeletarUnidade from "./pages/Unidade/DeletarUnidade";
import ModificarUnidade from "./pages/Unidade/ModificarUnidade";
import Venda from "./pages/Venda/ConsultarVenda";
import NovoVenda from "./pages/Venda/NovoVenda";
import DeletarVenda from "./pages/Venda/DeletarVenda";
import ModificarVenda from "./pages/Venda/ModificarVenda";

export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<div>
                    <h1>Controle de produtos</h1>
                    <Link className="button" to="clientes">Clientes</Link>
                    <Link className="button" to="produtos">Produtos</Link>
                    <Link className="button" to="unidades">Unidades</Link>
                    <Link className="button" to="vendas">Vendas</Link>
                </div>} />
                {/* Rotas de links dos clientes */}
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/clientes/novo" element={<NovoCliente />} />
                <Route path="/clientes/deletar/:id" element={<DeletarCliente />} />
                <Route path="/clientes/Modificar/:id" element={<ModificarCliente />} />

                {/* Rotas de links dos produtos */}
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/novo" element={<NovoProduto />} />
                <Route path="/produtos/deletar/:id" element={<DeletarProduto />} />
                <Route path="/produtos/modificar/:id" element={<ModificarProduto />} />

                {/* Rotas de links das unidades */}
                <Route path="/unidades" element={<Unidades />} />
                <Route path="/unidades/novo" element={<NovoUnidade />} />
                <Route path="/unidades/deletar/:id" element={<DeletarUnidade />} />
                <Route path="/unidades/modificar/:id" element={<ModificarUnidade />} />

                {/* Rotas de links das vendas */}
                <Route path="/vendas" element={<Venda />} />
                <Route path="/vendas/novo" element={<NovoVenda />} />
                <Route path="/vendas/deletar/:id" element={<DeletarVenda />} />
                <Route path="/vendas/modificar/:id" element={<ModificarVenda />} />

            </Routes>
        </BrowserRouter>
    )
}