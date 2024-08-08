import React from 'react';
import './Login.css';

function Login() {
    return (
        <React.Fragment>
            <form>
                <p>Login to access the full dashboard</p>
                <label htmlFor='email'>Email:</label>
                <input type='text' name='email' id='email'></input>
                <label htmlFor='password'>Password:</label>
                <input type='password' name='password' id='password'></input>
                <button>OK</button>
            </form>
        </React.Fragment>
    );
}

export default Login;
