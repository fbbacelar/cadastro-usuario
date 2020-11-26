import React from 'react'
import Main from '../template/Main'
import Userform from './Userform'
import UserTable from './UserTable'
import axios from 'axios'

import { /*NotificationContainer,*/ NotificationManager } from 'react-notifications'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários: Incluir, Listar, Alterar e Excluir'
};

// const baseUrl = 'http://45.6.88.254:8080/usuarios'
const baseUrl = 'http://localhost:8080/usuarios'

const initialState = {
    usuario: {
        id: 0,
        name: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    },
    list: [],
    showList: true,
    showForm: false
};

export default class UserCrud extends React.Component {

    constructor() {
        super()

        this.state = { ...initialState }

        this.clear = this.clear.bind(this)
        this.save = this.save.bind(this)
        this.getUpdatedList = this.getUpdatedList.bind(this)
        this.updateField = this.updateField.bind(this)
        this.load = this.load.bind(this)
        this.remove = this.remove.bind(this)
        this.showForm = this.showForm.bind(this)
        this.add = this.add.bind(this)
        this.handleEnterPress = this.handleEnterPress.bind(this)
    }

    add(){
        this.clear()
        this.showForm(true)
    }

    showForm(value){
        this.setState({
            showForm: value,
            showList: !value
        })
    }

    componentWillMount() {
        axios.get(baseUrl).then(response => {
            this.setState({ list: response.data });
        });
    }

    handleEnterPress(event) {
        if (event.key === 'Enter') {
            this.save();
        }
    }

    clear() {
        this.setState({ usuario: initialState.usuario });
        this.showForm(false)
    }

    save() {
        const usuario = this.state.usuario;
        const method = usuario.id ? 'put' : 'post';
        const url = usuario.id ? `${baseUrl}/${usuario.id}` : baseUrl;

        if (usuario.name === '' || usuario.email === '' ||  usuario.senha === '' ||  usuario.confirmacaoSenha === '') {
            NotificationManager.warning('Nome, e-mail, senha e confirmação obrigatórios', 'Preencha os campos')
        }else if (usuario.confirmacaoSenha !== usuario.senha ) {
            NotificationManager.warning('Senha e confirmação de senha diferentes', 'Preencha corretamente')
        } else {
            axios[method](url, usuario)
                .then(response => {
                    const list = this.getUpdatedList(response.data);
                    this.setState({ usuario: initialState.usuario, list });
                    if (method === 'post')
                        NotificationManager.success('Usuário criado com sucesso', 'Criar Usuário');
                    else
                        NotificationManager.success('Usuário alterado com sucesso', 'Editar Usuário');
                })
            this.showForm(false)
        }

    }

    getUpdatedList(usuario, add = true) {
        const list = this.state.list.filter(u => u.id !== usuario.id);
        if (add)
            list.push(usuario);
        return list;
    }

    updateField(event) {
        const usuario = { ...this.state.usuario };
        usuario[event.target.name] = event.target.value;
        this.setState({ usuario });
    }

    load(usuario) {
        this.setState({ usuario });
        this.showForm(true)
    }

    remove(usuario) {
        axios.delete(`${baseUrl}/${usuario.id}`)
            .then(response => {
                const list = this.getUpdatedList(usuario, false);
                this.setState({ list });
                NotificationManager.success('Usuário excluído com sucesso', 'Excluir Usuário');
            });
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.state.showForm
                &&
                <Userform name={this.state.usuario.name}
                    email={this.state.usuario.email}
                    senha={this.state.usuario.senha}
                    confirmacaoSenha={this.state.usuario.confirmacaoSenha}
                    clear={this.clear}
                    save={this.save}
                    updateField={this.updateField}
                    handleEnterPress={this.handleEnterPress}
                    /> 
                }
                {this.state.showList
                &&
                <UserTable list={this.state.list}
                    load={this.load}
                    remove={this.remove}
                    add={this.add}
                /> 
                }
            </Main>
        )
    }
}