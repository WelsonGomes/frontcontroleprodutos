import React, { useState, useEffect } from "react";
import './style.css';
import { FiFilePlus, FiCornerDownLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from "../../../services/api";
import { Alert } from "reactstrap";

export default function NovoProduto(){
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [unidade, setUnidade] = useState(0);
    const [maiorid, setProdutos] = useState(-1);

    const atribuirValor = () => {
        setId(maiorid);
      };

    useEffect(() => {
        if (maiorid < 0){
            api.get('Produto/maiorID').then(
                response => { setProdutos(response.data + 1) }
            )
        }
        atribuirValor();
        console.log('ID: ' + id);
        console.log('Maior ID: '+ maiorid);
    });

    async function postProduto(){
        const data = {
            id,
            nome,
            descricao,
            unidade
        }

        try {
            await api.post('Produto', data);
            Alert.alert("Sucesso", "Produto cadastrado com sucesso.");
        } catch (error) {
            Alert.alert("Erro ao salvar o produto" + error);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Novo Produto</h1>
                    <Link className="back-link" to="/produtos">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postProduto}>
                    <input value={maiorid} onChange={e => setId(e.target.value)} readOnly/>
                    <input placeholder="Nome" onChange={e => setNome(e.target.value)} maxLength={100} />
                    <input placeholder="descricao" onChange={e => setDescricao(e.target.value)} maxLength={100} />
                    <input placeholder="unidade" onChange={e => setUnidade(e.target.value)} />
                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    )
}