import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemScreen from "./ItemScreen";

type Item = {
    id?: number
    nome: string
    descricao: string
}

function HomeSreen() {
    const [criar, setCriar] = useState(false);
    const [itens, setItens] = useState<Item[]>([]);
    const [nome, setNome] = useState<string>();
    const [descricao, setDescricao] = useState<string>();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(function () {
        axios.get('http://10.60.46.43:4000/api/itens')
            .then(function (response) {
                setItens(response.data);
            })
            .catch(function (error) {
                alert(error);
            });
    }, []);

    function recarregarItens() {
        setCarregando(true);
        axios.get('http://10.60.46.43:4000/api/itens')
            .then(function (response) {
                setItens(response.data);
            })
            .catch(function (error) {
                setErro('Não foi possivel conectar no servidor');
            })
            .finally(function () {
                setCarregando(false);
            });
    }

    useEffect(function () {
        recarregarItens();
    }, []);

    function botaoRecarregarClicado() {
        recarregarItens();
    }

    function botaoSalvarClicado() {
        if ((nome !== undefined) && (descricao !== undefined)) {
            setCarregando(true)
            const item: Item = {
                nome,
                descricao
            }
            axios.post('http://10.60.46.43:4000/api/itens', item)
                .finally(function () {
                    setCarregando(false);
                })
                .then(function () {
                    setNome('');
                    setDescricao('');
                    recarregarItens();
                })
                .catch(function (error) {
                    setErro('Não foi possivel criar o Item')
                })
        }
    }
    function criarItem() {
        setCriar(true)

    }

    function fechar() {
        setCriar(false)
    }

    return (
        <div>
            <h1>Home <button onClick={botaoRecarregarClicado}>Recarregar</button></h1>
            {(carregando) ? (
                <div>Carregando...</div>
            ) : (
                <>
                    {(erro !== '') && (
                        <div>ERRO: {erro}</div>
                    )}
                    <ul>
                        {itens.map(function (item) {
                            return <li>
                                <Link to={`/itens/${item.id}`}>{item.nome}</Link>

                            </li>
                        })}
                    </ul>
                    <button onClick={criarItem}>Criar Item</button>
                    {(criar) && (
                        <><div>
                            <input
                                placeholder='Nome'
                                onChange={function (e) { setNome(e.target.value); }}
                            />
                            <input
                                placeholder='Descrição'
                                onChange={function (e) { setDescricao(e.target.value); }}
                            />
                        </div>
                            <div>
                                <button onClick={botaoSalvarClicado}>Salvar</button>
                                <button onClick={fechar}>Fechar</button>
                            </div></>)}
                </>
            )}

        </div>
    );

}

export default HomeSreen;


