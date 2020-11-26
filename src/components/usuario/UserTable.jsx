import React from 'react';

export default props => {

    const lista = props.list;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={props.add}>
                        <i className="fa fa-user-plus mr-1"></i> Novo usuário
                    </button>
                </div>
            </div>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn btn-warning" title='Editar' onClick={() => props.load(user)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button className="btn btn-danger ml-2" id='btn-excluir' title='Excluir' onClick={() => props.remove(user)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}