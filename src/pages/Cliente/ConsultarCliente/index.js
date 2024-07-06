import React, { useState, useEffect } from 'react';
import './style.css';
import logoCliente from '../../../assets/login.png';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import { ImPencil } from 'react-icons/im';

export default function Clientes(){
    const [clientes, setClientes] = useState([]);

    //Faz a requisição para trazer a lista de clientes do backEnd
    useEffect(() => {
        if (clientes.length <= 0){
            api.get('Cliente').then(
                response => { setClientes(response.data) }
            )
        }
    });

    return (
        <div className='estado-container'>
            <header>
                <img src={logoCliente} alt='Clientes' />
                <Link className="button" to="novo">Novo Cliente</Link>
            </header>
            <h1>Lista de Clientes</h1>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Data Nascimento</th>
                        <th>Opções</th>
                    </tr>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cpfcnpj}</td>
                        <td>{cliente.dtnascimento}</td>
                        <td className='tdOpcoes'>
                            <Link to={`Deletar/${cliente.id}`}>
                                <button type='button'>
                                    <FiTrash size={25} color='#17202a' />
                                </button>
                            </Link>
                            <Link to={`Modificar/${cliente.id}`}>
                                <button type='button'>
                                    <ImPencil size={25} color='#17202a' />
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