import React from 'react';
import {css, StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    appInput: {
        marginRight: '15px',
        marginLeft: '5px',
        marginBottom: '5px',
        marginTop: '5px',
        "@media (max-width: 900px)": {
            display: "block",
        },
    },
    label: {
        "@media (max-width: 900px)": {
            display: "inline-block",
            padding: "0",
            marginLeft: "5px",
        },
    },
});

function Login() {
    return (
        <React.Fragment>
            <form>
                <p>Login to access the full dashboard</p>
                <label htmlFor='email' className={css(styles.label)}>Email:</label>
                <input type='text' name='email' id='email' className={css(styles.appInput)}></input>
                <label htmlFor='password' className={css(styles.label)}>Password:</label>
                <input type='password' name='password' id='password' className={css(styles.appInput)}></input>
                <button className={css(styles.appInput)}>OK</button>
            </form>
        </React.Fragment>
    );
}

export default Login;
