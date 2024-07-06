import React, { useState, useEffect } from 'react';
import './style.css';
import logoProduto from '../../../assets/produto.png';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import { FiTrash, FiEdit } from 'react-icons/fi';

export default function Venda(){
    const [vendas, setVendas] = useState([]);

    //Faz a requisição para trazer a lista de clientes do backEnd
    useEffect(() => {
        if (vendas.length <= 0){
            api.get('Venda').then(
                response => { setVendas(response.data) }
            )
        }
    });

    return (
        <div className='estado-container'>
            <header>
                <img src={logoProduto} alt='Produtos' />
                <Link className="button" to="novo">Nova Venda</Link>
            </header>
            <h1>Lista de Vendas</h1>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>produto</th>
                        <th>valor</th>
                        <th>Opções</th>
                    </tr>
                    {vendas.map(venda => (
                        <tr key={venda.id}>
                        <td>{venda.id}</td>
                        <td>{venda.cliente}</td>
                        <td>{venda.produto}</td>
                        <td>{venda.valor}</td>
                        <td className='tdOpcoes'>
                            <Link to={`Deletar/${venda.id}`}>
                                <button type='button'>
                                    <FiTrash size={25} color='#17202a' />
                                </button>
                            </Link>
                            {" "}
                            <Link to={`Modificar/${venda.id}`}>
                                <button type='button'>
                                    <FiEdit size={25} color='#17202a' />
                                </button>
                            </Link>
                        </td>
                    </tr>
                    ))}
                </thead>
            </table>
        </div>
    )
}