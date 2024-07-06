import React, { useState, useEffect } from "react";
import './style.css';
import { FiFilePlus, FiCornerDownLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from "../../../services/api";
import { Alert } from "reactstrap";

export default function NovoVenda(){
    const [id, setId] = useState(0);
    const [cliente, setCliente] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState(0);
    const [maiorid, setVendas] = useState(-1);

    const atribuirValor = () => {
        setId(maiorid);
      };

    useEffect(() => {
        if (maiorid < 0){
            api.get('Venda/maiorID').then(
                response => { setVendas(response.data + 1) }
            )
        }
        atribuirValor();
        console.log('ID: ' + id);
        console.log('Maior ID: '+ maiorid);
    });

    async function postVendas(){
        const data = {
            id,
            cliente,
            produto,
            valor
        }

        try {
            await api.post('Venda', data);
            Alert.alert("Sucesso", "Vendas cadastrado com sucesso.");
        } catch (error) {
            Alert.alert("Erro ao salvar o vendas" + error);
        }
    }

    return (
        <div className="novo-estado-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Novo Vendas</h1>
                    <Link className="back-link" to="/vendas">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postVendas}>
                    <input value={maiorid} onChange={e => setId(e.target.value)} readOnly/>
                    <input placeholder="cliente" onChange={e => setCliente(e.target.value)} />
                    <input placeholder="produto" onChange={e => setProduto(e.target.value)} />
                    <input placeholder="valor" onChange={e => setValor(e.target.value)} />
                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    )
}