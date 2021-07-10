import React, { useState } from 'react';
import './styles.css';

function Login({ history }) {
    const [apelido, setApelido] = useState('');

    function handleSubmit(params) {
        history.push('/game')
    }
    return (
        <div className="login-container">
                <div className="login-card">
                       <form onSubmit={handleSubmit}>
                            <div className="login-content">
                                <div className="login-identificacao">
                                    <h4>Como quer ser chamado?</h4>
                                    <input placeholder="..." type="text" value={apelido} onChange={e => setApelido(e.target.value)} />    
                                </div>
                                <div className="login-snake-img">
                                    <img className="snake-img" src="http://i.imgur.com/HROs5Ie.gif" alt="snake"/>
                                </div>
                                <button type="submit" className="btn-play" disabled={!apelido}>
                                    Play
                                </button>
                            </div>
                    </form>
                </div>
        </div>
    )
}

export default Login;