import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function ModificarProduto(){
    const {id} = useParams();
    const [codigo, setCodigo] = useState(0);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [unidade, setUnidade] = useState('');
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const loadProduto = useCallback(async () => {
        try {
            const response = await api.get('Produto/' + id);
            setCodigo(response.data.id);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
            setUnidade(response.data.unidade);
        } catch (error) {
            alert("Erro ao buscar o prduto" + error);
        }
    },[id, setCodigo, setNome, setDescricao, setUnidade]);

    useEffect(() => {
        if (!load) {
            loadProduto();
            setLoad(true);
        }
    })

    async function ModificarProduto(){
        const data = {
            id,
            nome,
            descricao,
            unidade
        }

        try {
            await api.put('Produto',data);
            alert("Sucesso!", "Produto alterado com sucesso.");
        } catch (error) {
            alert("Erro ao deletar o produto" + error);
        }
        navigate("/produtos");
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
                <div className='content'>
                    <section className="form">
                        <FiFileMinus size={105} color='#17202a' />
                        <h1>Deletar Produto</h1>
                        <Link className='back-link' to="/produtos">
                            <FiCornerDownLeft size={105} color='#17202a' />
                        </Link>
                    </section>
                    <form onSubmit={ModificarProduto}>
                        <input value={codigo} onChange={e => setCodigo(e.target.value)} readOnly/>
                        <input value={nome} onChange={e => setNome(e.target.value)} maxLength={100} />
                        <input value={descricao} onChange={e => setDescricao(e.target.value)} maxLength={18} />
                        <input value={unidade} onChange={e => setUnidade(e.target.value)} />
                        <button className="button" type="submit">Modificar</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}