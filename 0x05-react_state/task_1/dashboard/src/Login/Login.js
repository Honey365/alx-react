import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    appInput: {
        marginRight: '15px',
        marginLeft: '5px',
        marginBottom: '5px',
        marginTop: '5px',
        '@media (max-width: 900px)': {
            display: 'block',
        },
    },
    label: {
        '@media (max-width: 900px)': {
            display: 'inline-block',
            padding: '0',
            marginLeft: '5px',
        },
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            enableSubmit: false,
        };

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoggedIn: true });
    };

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value }, this.checkEnableSubmit);
    };

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value }, this.checkEnableSubmit);
    };

    checkEnableSubmit = () => {
        const { email, password } = this.state;
        this.setState({ enableSubmit: email.trim() !== '' && password.trim() !== '' });
    };

    render() {

        return (
            <React.Fragment>
                <form onSubmit={this.handleLoginSubmit}>
                    <p>Login to access the full dashboard</p>
                    <label htmlFor='email' className={css(styles.label)}>Email:</label>
                    <input type='text' name='email' id='email' className={css(styles.appInput)} value={this.state.email} onChange={this.handleChangeEmail}/>
                    <label htmlFor='password' className={css(styles.label)}>Password:</label>
                    <input type='password' name='password' id='password' className={css(styles.appInput)} value={this.state.password} onChange={this.handleChangePassword}/>
                    <input type='submit' className={css(styles.appInput)} value='OK' disabled={!this.state.enableSubmit} />
                </form>
            </React.Fragment>
        );
    }
}

export default Login;
