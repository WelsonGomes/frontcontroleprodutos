import React, { useState, useCallback, useEffect } from 'react';
import './style.css';
import { FiFileMinus, FiCornerDownLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

export default function DeletarVenda() {
    const {id} = useParams();
    const [cliente, setCliente] = useState('');
    const [produto, setProduto] = useState('');
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const loadVenda = useCallback(async () => {
        try {
            const response = await api.get('Venda/' + id);
            setCliente(response.data.cliente);
            setProduto(response.data.produto);
        } catch (error) {
            alert("Erro ao buscar o Venda" + error);
        }
    },[id, setCliente, setProduto]);

    useEffect(() => {
        if (!load) {
            loadVenda();
            setLoad(true);
        }
    })

    async function DeleteVenda(){
        try {
            await api.delete(`Venda/Delete/${id}`);
        } catch (error) {
            alert("Erro ao deletar o venda" + error);
        }
        navigate("/vendas");
    }

    return (
        <div className='novo-estado-container'>
            <div className='content'>
                <section className="form">
                    <FiFileMinus size={105} color='#17202a' />
                    <h1>Deletar venda</h1>
                    <Link className='back-link' to="/vendas">
                        <FiCornerDownLeft size={105} color='#17202a' />
                    </Link>
                </section>
                <div className="formExibir">
                    <h1>{id}</h1>
                    <h2>{cliente}</h2>
                    <h2>{produto}</h2>
                    <button className="button" onClick={DeleteVenda}>
                        Deletar Venda
                    </button>
                </div>
            </div>
        </div>
    )
}