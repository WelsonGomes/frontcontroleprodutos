import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function ModificarCliente(){
    const {id} = useParams();
    const [codigo, setCodigo] = useState(0);
    const [nome, setNome] = useState('');
    const [cpfcnpj, setCpfcnpj] = useState('');
    const [dtnascimento, setDtNascimento] = useState('');
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const loadCliente = useCallback(async () => {
        try {
            const response = await api.get('Cliente/' + id);
            setCodigo(response.data.id);
            setNome(response.data.nome);
            setCpfcnpj(response.data.cpfcnpj);
            setDtNascimento(response.data.dtnascimento);
        } catch (error) {
            alert("Erro ao buscar o cliente" + error);
        }
    },[id, setCodigo, setNome, setCpfcnpj, setDtNascimento]);

    useEffect(() => {
        if (!load) {
            loadCliente();
            setLoad(true);
        }
    })

    async function ModificarCliente(){
        const data = {
            id,
            nome,
            cpfcnpj,
            dtnascimento
        }

        try {
            await api.put('Cliente',data);
            alert("Sucesso!", "Cliente alterado com sucesso.");
        } catch (error) {
            alert("Erro ao deletar o cliente" + error);
        }
        navigate("/clientes");
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
            <div className='content'>
                <section className="form">
                    <FiFileMinus size={105} color='#17202a' />
                    <h1>Deletar Cliente</h1>
                    <Link className='back-link' to="/clientes">
                        <FiCornerDownLeft size={105} color='#17202a' />
                    </Link>
                </section>
                <form onSubmit={ModificarCliente}>
                    <input value={codigo} onChange={e => setCodigo(e.target.value)} readOnly/>
                    <input value={nome} onChange={e => setNome(e.target.value)} maxLength={100} />
                    <input value={cpfcnpj} onChange={e => setCpfcnpj(e.target.value)} maxLength={18} />
                    <input value={dtnascimento} onChange={e => setDtNascimento(e.target.value)} maxLength={10} />
                    <button className="button" type="submit">Modificar</button> 
                </form>
            </div>
            </div>
        </div>
    )
}