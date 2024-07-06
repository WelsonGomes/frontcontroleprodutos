import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function ModificarUnidade(){
    const {id} = useParams();
    const [codigo, setCodigo] = useState(0);
    const [sigla, setSigla] = useState('');
    const [descricao, setDescricao] = useState('');
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const loadUnidade = useCallback(async () => {
        try {
            const response = await api.get('Unidade/' + id);
            setCodigo(response.data.id);
            setSigla(response.data.sigla);
            setDescricao(response.data.descricao);
        } catch (error) {
            alert("Erro ao buscar o unidade" + error);
        }
    },[id, setCodigo, setSigla, setDescricao]);

    useEffect(() => {
        if (!load) {
            loadUnidade();
            setLoad(true);
        }
    })

    async function ModificarUnidade(){
        const data = {
            id,
            sigla,
            descricao
        }

        try {
            await api.put('Unidade',data);
            alert("Sucesso!", "Unidade alterado com sucesso.");
        } catch (error) {
            alert("Erro ao deletar o unidade" + error);
        }
        navigate("/unidades");
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
                <div className='content'>
                    <section className="form">
                        <FiFileMinus size={105} color='#17202a' />
                        <h1>Deletar Unidade</h1>
                        <Link className='back-link' to="/unidades">
                            <FiCornerDownLeft size={105} color='#17202a' />
                        </Link>
                    </section>
                    <form onSubmit={ModificarUnidade}>
                        <input value={codigo} onChange={e => setCodigo(e.target.value)} readOnly/>
                        <input value={sigla} onChange={e => setSigla(e.target.value)} maxLength={2} />
                        <input value={descricao} onChange={e => setDescricao(e.target.value)} maxLength={18} />
                        <button className="button" type="submit">Modificar</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}