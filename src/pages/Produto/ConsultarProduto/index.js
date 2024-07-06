import React, { useState, useEffect } from 'react';
import './style.css';
import logoProduto from '../../../assets/produto.png';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import { FiTrash, FiEdit } from 'react-icons/fi';

export default function Produto(){
    const [produtos, setProdutos] = useState([]);

    //Faz a requisição para trazer a lista de clientes do backEnd
    useEffect(() => {
        if (produtos.length <= 0){
            api.get('Produto').then(
                response => { setProdutos(response.data) }
            )
        }
    });

    return (
        <div className='estado-container'>
            <header>
                <img src={logoProduto} alt='Produtos' />
                <Link className="button" to="novo">Novo Produto</Link>
            </header>
            <h1>Lista de Produtos</h1>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Unidade</th>
                        <th>Opções</th>
                    </tr>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.unidade}</td>
                        <td className='tdOpcoes'>
                            <Link to={`Deletar/${produto.id}`}>
                                <button type='button'>
                                    <FiTrash size={25} color='#17202a' />
                                </button>
                            </Link>
                            {" "}
                            <Link to={`Modificar/${produto.id}`}>
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