import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function DeletarUnidade() {
    const {id} = useParams();
    const [sigla, setSigla] = useState('');
    const [descricao, setDescricao] = useState('');
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const loadUnidade = useCallback(async () => {
        try {
            const response = await api.get('Unidade/' + id);
            setSigla(response.data.sigla);
            setDescricao(response.data.descricao);
        } catch (error) {
            alert("Erro ao buscar o unidade" + error);
        }
    },[id, setSigla, setDescricao]);

    useEffect(() => {
        if (!load) {
            loadUnidade();
            setLoad(true);
        }
    })

    async function DeleteUnidade(){
        try {
            await api.delete(`Unidade/Delete/${id}`);
        } catch (error) {
            alert("Erro ao deletar o unidade" + error);
        }
        navigate("/unidades");
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
                <section className="form">
                    <FiFileMinus size={105} color='#17202a' />
                    <h1>Deletar Unidade</h1>
                    <Link className='back-link' to="/unidades">
                        <FiCornerDownLeft size={105} color='#17202a' />
                    </Link>
                </section>
                <div className="formExibir">
                    <h1>{id}</h1>
                    <h2>{sigla}</h2>
                    <h2>{descricao}</h2>
                    <button className="button" onClick={DeleteUnidade}>
                        Deletar Unidade
                    </button>
                </div>
            </div>
        </div>
    )
}