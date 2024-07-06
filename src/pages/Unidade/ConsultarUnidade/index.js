import React, { useState, useEffect } from 'react';
import './style.css';
import logoProduto from '../../../assets/produto.png';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import { FiTrash, FiEdit } from 'react-icons/fi';

export default function Unidades(){
    const [unidades, setUnidade] = useState([]);

    //Faz a requisição para trazer a lista de clientes do backEnd
    useEffect(() => {
        if (unidades.length <= 0){
            api.get('Unidade').then(
                response => { setUnidade(response.data) }
            )
        }
    });

    return (
        <div className='estado-container'>
            <header>
                <img src={logoProduto} alt='Unidades' />
                <Link className="button" to="novo">Nova Unidade</Link>
            </header>
            <h1>Lista de Unidades</h1>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>sigla</th>
                        <th>Descrição</th>
                        <th>Opções</th>
                    </tr>
                    {unidades.map(unidade => (
                        <tr key={unidade.id}>
                        <td>{unidade.id}</td>
                        <td>{unidade.sigla}</td>
                        <td>{unidade.descricao}</td>
                        <td className='tdOpcoes'>
                            <Link to={`Deletar/${unidade.id}`}>
                                <button type='button'>
                                    <FiTrash size={25} color='#17202a' />
                                </button>
                            </Link>
                            {" "}
                            <Link to={`Modificar/${unidade.id}`}>
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