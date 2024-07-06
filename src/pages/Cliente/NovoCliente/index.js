import React, { useState, useEffect } from "react";
import './style.css';
import { FiFilePlus, FiCornerDownLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from "../../../services/api";
import { Alert } from "reactstrap";

export default function NovoCliente(){
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [cpfcnpj, setCpfcnpj] = useState('');
    const [dtnascimento, setDtNascimento] = useState('');
    const [maiorid, setClientes] = useState(-1);

    const atribuirValor = () => {
        setId(maiorid);
      };

    useEffect(() => {
        if (maiorid < 0){
            api.get('Cliente/maiorID').then(
                response => { setClientes(response.data + 1) }
            )
        }
        atribuirValor();
        console.log('ID: ' + id);
    });

    async function postCliente(){
        const data = {
            id,
            nome,
            cpfcnpj,
            dtnascimento
        }

        try {
            await api.post('Cliente', data);
            Alert.alert("Sucesso", "Cliente cadastrado com sucesso.");
        } catch (error) {
            Alert.alert("Erro ao salvar o cliente" + error);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Novo Cliente</h1>
                    <Link className="back-link" to="/clientes">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postCliente}>
                    <input value={maiorid} onChange={e => setId(e.target.value)} readOnly/>
                    <input placeholder="Nome" onChange={e => setNome(e.target.value)} maxLength={100} />
                    <input placeholder="cpfcnpj" onChange={e => setCpfcnpj(e.target.value)} maxLength={18} />
                    <input placeholder="dtnascimento" onChange={e => setDtNascimento(e.target.value)} maxLength={10} />
                    <button className="button" type="submit">Salvar</button> 
                </form>
            </div>
        </div>
    )
}