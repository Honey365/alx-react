import React from 'react';
import {css, StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    appInput: {
        marginRight: '15px',
        marginLeft: '5px',
    },
});

function Login() {
    return (
        <React.Fragment>
            <form>
                <p>Login to access the full dashboard</p>
                <label htmlFor='email'>Email:</label>
                <input type='text' name='email' id='email' className={css(styles.appInput)}></input>
                <label htmlFor='password'>Password:</label>
                <input type='password' name='password' id='password' className={css(styles.appInput)}></input>
                <button>OK</button>
            </form>
        </React.Fragment>
    );
}

export default Login;
