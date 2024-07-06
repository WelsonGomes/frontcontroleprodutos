import React, { useState, useEffect } from "react";
import './style.css';
import { FiFilePlus, FiCornerDownLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from "../../../services/api";
import { Alert } from "reactstrap";

export default function NovoUnidade(){
    const [id, setId] = useState(0);
    const [sigla, setSigla] = useState('');
    const [descricao, setDescricao] = useState('');
    const [maiorid, setUnidades] = useState(-1);

    const atribuirValor = () => {
        setId(maiorid);
      };

    useEffect(() => {
        if (maiorid < 0){
            api.get('Unidade/maiorID').then(
                response => { setUnidades(response.data + 1) }
            )
        }
        atribuirValor();
        console.log('ID: ' + id);
        console.log('Maior ID: '+ maiorid);
    });

    async function postUnidade(){
        const data = {
            id,
            sigla,
            descricao
        }

        try {
            await api.post('Unidade', data);
            Alert.alert("Sucesso", "Unidade cadastrado com sucesso.");
        } catch (error) {
            Alert.alert("Erro ao salvar o unidade" + error);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Nova Unidade</h1>
                    <Link className="back-link" to="/unidades">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postUnidade}>
                    <input value={maiorid} onChange={e => setId(e.target.value)} readOnly/>
                    <input placeholder="Sigla" onChange={e => setSigla(e.target.value)} maxLength={2} />
                    <input placeholder="descricao" onChange={e => setDescricao(e.target.value)} maxLength={100} />
                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    )
}