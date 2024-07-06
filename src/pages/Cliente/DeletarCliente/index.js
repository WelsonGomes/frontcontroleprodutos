import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function DeletarCliente() {
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [cpfcnpj, setCpfcnpj] = useState('');
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const loadCliente = useCallback(async () => {
        try {
            const response = await api.get('Cliente/' + id);
            setNome(response.data.nome);
            setCpfcnpj(response.data.cpfcnpj);
        } catch (error) {
            alert("Erro ao buscar o cliente" + error);
        }
    },[id, setNome, setCpfcnpj]);

    useEffect(() => {
        if (!load) {
            loadCliente();
            setLoad(true);
        }
    })

    async function DeleteCliente(){
        try {
            await api.delete(`Cliente/Delete/${id}`).then(
                navigate("/clientes")
            );
        } catch (error) {
            alert("Erro ao deletar o cliente" + error);
        }
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
                <section className="form">
                    <FiFileMinus size={105} color='#17202a' />
                    <h1>Deletar Cliente</h1>
                    <Link className='back-link' to="/clientes">
                        <FiCornerDownLeft size={105} color='#17202a' />
                    </Link>
                </section>
                <div className="formExibir">
                    ID:<h1>{id}</h1>
                    NOME:<h2>{nome}</h2>
                    CPFCNPJ:<h2>{cpfcnpj}</h2>
                    <button className="button" onClick={DeleteCliente}>
                        Deletar Cliente
                    </button>
                </div>
            </div>
        </div>
    )
}