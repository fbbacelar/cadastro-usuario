import React from 'react';

export default props =>
    <div className="form">

        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Nome</label>
                    <input type="text"
                        name="nome"
                        id="nome"
                        className="form-control"
                        autoComplete='off'
                        value={props.nome}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder='Digite o nome...' />
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        autoComplete='off'
                        value={props.email}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder="Digite o e-mail..." />
                </div>
            </div>
        </div>

        <div className="row">
            {/* <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Telefone</label>
                    <input type="text"
                        name="telefone"
                        id="telefone"
                        className="form-control"
                        autoComplete='off'
                        value={props.telefone}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder='Digite o telefone...' />
                </div>
            </div> */}
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>Senha</label>
                    <input type="password"
                        name="senha"
                        id="senha"
                        className="form-control"
                        autoComplete='off'
                        value={props.senha}
                        onChange={e => props.updateField(e)}
                        onKeyPress={props.handleEnterPress}
                        placeholder='Digite a senha...' />
                </div>
            </div>
        </div>

        <hr />

        <div className="row">
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-success" onClick={props.save}>
                    <i className="fa fa-save mr-1"></i> Salvar
                </button>
                <button className="btn btn-danger ml-2" onClick={props.clear}>
                    <i className="fa fa-remove mr-1"></i> Cancelar
                </button>
            </div>
        </div>

    </div>