import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function DeletarProduto() {
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const loadProduto = useCallback(async () => {
        try {
            const response = await api.get('Produto/' + id);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
        } catch (error) {
            alert("Erro ao buscar o produto" + error);
        }
    },[id, setNome, setDescricao]);

    useEffect(() => {
        if (!load) {
            loadProduto();
            setLoad(true);
        }
    })

    async function DeleteProduto(){
        try {
            await api.delete(`Produto/Delete/${id}`);
        } catch (error) {
            alert("Erro ao deletar o produto" + error);
        }
        navigate("/produtos");
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
                <section className="form">
                    <FiFileMinus size={105} color='#17202a' />
                    <h1>Deletar Produto</h1>
                    <Link className='back-link' to="/produtos">
                        <FiCornerDownLeft size={105} color='#17202a' />
                    </Link>
                </section>
                <div className="formExibir">
                    <h1>{id}</h1>
                    <h2>{nome}</h2>
                    <h2>{descricao}</h2>
                    <button className="button" onClick={DeleteProduto}>
                        Deletar Produto
                    </button>
                </div>
            </div>
        </div>
    )
}