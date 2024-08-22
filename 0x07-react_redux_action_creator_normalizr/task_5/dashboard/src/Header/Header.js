import React, { useContext } from "react";
import logo from "../assets/Holberton-logo.jpg";
import {css, StyleSheet} from "aphrodite";
import {AppContext} from "../App/AppContext";

const colorPrimary = '#d93654';

const styles = StyleSheet.create({
    appHeader: {
        height: '180px',
        borderBottom: `3px solid ${colorPrimary}`,
        display: 'flex',
        paddingLeft: '5px',
        "@media (max-width: 900px)": {
            height :"auto"
        },
    },
    appHeaderH1: {
        color: `${colorPrimary}`,
        marginLeft: '50px',
        fontSize: '2.0rem',
        marginTop: '70px',
    },
    appHeaderImg: {
        height: '180px',
    },
    link : {
        color: colorPrimary,
        fontStyle: 'italic',
    }
});

class Header extends React.Component {
    static contextType = AppContext;

    render() {
        const { user, logOut } = this.context;

        return (
            <>
                <div className={css(styles.appHeader)}>
                    <img src={logo} className={css(styles.appHeaderImg)} alt="logo"/>
                    <h1 className={css(styles.appHeaderH1)}>School dashboard</h1>
                </div>
                {user.isLoggedIn &&
                    <section id='logoutSection'>
                        <p>Welcome <strong>{user.email}</strong> (<a href='#' className={css(styles.link)} onClick={logOut}>Log out</a>)</p>
                    </section>
                }
            </>
        );
    }
}

export default Header;
