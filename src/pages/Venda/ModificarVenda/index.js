import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function ModificarVenda(){
    const {id} = useParams();
    const [codigo, setCodigo] = useState(0);
    const [cliente, setCliente] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const loadVenda = useCallback(async () => {
        try {
            const response = await api.get('Venda/' + id);
            setCodigo(response.data.id);
            setCliente(response.data.cliente);
            setProduto(response.data.produto);
            setValor(response.data.valor);
        } catch (error) {
            alert("Erro ao buscar o venda" + error);
        }
    },[id, setCodigo, setCliente, setProduto, setValor]);

    useEffect(() => {
        if (!load) {
            loadVenda();
            setLoad(true);
        }
    })

    async function ModificarVenda(){
        const data = {
            id,
            cliente,
            produto,
            valor
        }

        try {
            await api.put('Venda',data);
            alert("Sucesso!", "Venda alterado com sucesso.");
        } catch (error) {
            alert("Erro ao deletar o venda" + error);
        }
        navigate("/vendas");
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
                <div className='content'>
                    <section className="form">
                        <FiFileMinus size={105} color='#17202a' />
                        <h1>Deletar Vendas</h1>
                        <Link className='back-link' to="/vendas">
                            <FiCornerDownLeft size={105} color='#17202a' />
                        </Link>
                    </section>
                    <form onSubmit={ModificarVenda}>
                        <input value={codigo} onChange={e => setCodigo(e.target.value)} readOnly/>
                        <input value={cliente} onChange={e => setCliente(e.target.value)} maxLength={100} />
                        <input value={produto} onChange={e => setProduto(e.target.value)} maxLength={18} />
                        <input value={valor} onChange={e => setValor(e.target.value)} />
                        <button className="button" type="submit">Modificar</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}