import React from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { StyleSheet, css } from "aphrodite";
import {AppContext} from './AppContext';
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer } from "../actions/uiActionCreators";
import PropTypes from "prop-types";



const colorPrimary = '#d93654';

const styles = StyleSheet.create({
    App: {
        height: "100vh",
        maxWidth: "100vw",
        position: "relative",
        fontFamily: "Arial, Helvetica, sans-serif",
    },
    appFooter: {
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        fontStyle: 'italic',
        borderTop: `3px solid ${colorPrimary}`,
        height: '6rem',
        width: '100%',
        paddingTop: '20px',
        "@media (max-width: 900px)": {
            position: "static",
        },
    },
});

export class App extends React.Component {

    static propTypes = {
        displayDrawer: PropTypes.bool,
        handleDisplayDrawer: PropTypes.func,
        handleHideDrawer: PropTypes.func,
        isLoggedIn: PropTypes.bool
    }

    static defaultProps = {
        displayDrawer: false,
        handleDisplayDrawer: () => {},
        handleHideDrawer: () => {},
        isLoggedIn: false
    }

    constructor(props) {
        super(props);
        this.handleKeyDownPress = this.handleKeyDownPress.bind(this);
        this.logIn = this.logIn.bind(this);
        this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

        this.state = {
            displayDrawer: false,
            user: {
                email: '',
                password: '',
                isLoggedIn: false,
            },
            logOut: () => {
                    this.setState({ user: {email: '', password: '', isLoggedIn: false}});
            },
            listNotifications: [
                { id: 1, type: "default", value: "New course available" },
                { id: 2, type: "urgent", value: "New resume available" },
                { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
            ]
        };
    }

    listCourses = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
    ];



    handleKeyDownPress(event) {
        if (event.ctrlKey && event.key === 'h') {
            alert("Logging you out");
            this.state.logOut();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDownPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDownPress);
    }

    logIn(email, password) {
        this.setState({
            user: { email, password, isLoggedIn: true,},
        });
    }

    logOut() {
        this.setState({ user: {email: '', password: '', isLoggedIn: false}});
    }

    markNotificationAsRead (id) {
        this.setState((prevState) => {
            const updatedNotifications = prevState.listNotifications.filter(
                (notification) => notification.id !== id
            );
            return { listNotifications: updatedNotifications };
        });
    };

    render() {

        const {
            displayDrawer,
            displayNotificationDrawer,
            hideNotificationDrawer,
        } = this.props;

        return (
            <AppContext.Provider
                value={{
                    user: this.state.user,
                    logout: this.state.logOut,
                }}
            >
                <React.Fragment>
                    <div className="root-notifications">
                        <Notifications
                            listNotifications={this.state.listNotifications}
                            displayDrawer={displayDrawer}
                            handleDisplayDrawer={displayNotificationDrawer}
                            handleHideDrawer={hideNotificationDrawer}
                            markNotificationAsRead={this.markNotificationAsRead}
                        />
                    </div>
                    <div className={css(styles.App)}>
                        <Header />
                        <div className="App-body">
                            {this.state.user.isLoggedIn ?
                                <BodySectionWithMarginBottom title={"Course list"}>
                                    <CourseList listCourses={this.listCourses} />
                                </BodySectionWithMarginBottom> :
                                <BodySectionWithMarginBottom title={"Log in to continue"}>
                                    <Login logIn={this.logIn} />
                                </BodySectionWithMarginBottom>
                            }
                            <BodySection title="News from the school">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ex nec sem pulvinar maximus. Maecenas faucibus eleifend vestibulum. Nulla nunc lorem, sollicitudin condimentum massa nec, volutpat porta elit. Curabitur maximus lectus pharetra massa faucibus varius. Aliquam molestie, mauris vel facilisis tincidunt, neque tortor auctor diam, nec aliquam magna sem quis nunc. Pellentesque feugiat magna in elit posuere, vitae pulvinar nulla auctor. Donec tortor ligula, tempor ac auctor vel, consequat eget arcu. Vivamus congue ligula quis tellus bibendum congue. Praesent ut velit varius, fermentum mi convallis, eleifend arcu. Suspendisse feugiat purus eget lectus gravida, sit amet mollis tortor hendrerit. Donec fermentum tellus mauris, at rhoncus neque vehicula eleifend. Phasellus iaculis non enim sed dictum.

                                    Praesent efficitur vestibulum est, vitae blandit diam hendrerit id. Donec sed vestibulum mauris. Mauris metus est, ultrices id tempus lobortis, molestie quis quam. Cras consequat nibh sed pulvinar varius. Nam interdum id velit hendrerit maximus. Donec maximus ligula eu nunc volutpat aliquam. Curabitur bibendum, lectus eget suscipit cursus, velit magna varius massa, sit amet ullamcorper risus ligula vel nulla. Donec tristique, ex eleifend molestie efficitur, eros nulla tincidunt neque, quis convallis nulla metus sit amet ex. Duis arcu sem, malesuada non rutrum sed, dignissim in nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam interdum nisl a ipsum mattis malesuada vel vitae velit.
                                </p>
                            </BodySection>
                        </div>
                        <div className={css(styles.appFooter)}>
                            <Footer />
                        </div>
                    </div>
                </React.Fragment>
            </AppContext.Provider>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.get("isUserLoggedIn"),
        displayDrawer: state.get('isNotificationDrawerVisible'),
    }
}

export const mapDispatchToProps = {
    displayNotificationDrawer,
    hideNotificationDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
