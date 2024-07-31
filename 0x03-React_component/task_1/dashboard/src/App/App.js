import React from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.css';
import PropTypes from 'prop-types';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleKeyDownPress = this.handleKeyDownPress.bind(this);
    }

    listCourses = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
    ];

    listNotifications = [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ];

    handleKeyDownPress(event) {
        if (event.ctrlKey && event.keyCode === 72) {
            event.preventDefault();
            alert("Logging you out");
            this.props.logOut();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDownPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDownPress);
    }

    render() {
        return (
            <React.Fragment>
                <div className="root-notifications">
                    <Notifications listNotifications={this.listNotifications} />
                </div>
                <div className="App">
                    <Header />
                    <div className="App-body">
                        {this.props.isLoggedIn ? <CourseList listCourses={this.listCourses} /> : <Login />}
                    </div>
                    <div className='App-footer'>
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    static defaultProps = {
        isLoggedIn: false,
        logOut: () => { },
    };

    static propTypes = {
        isLoggedIn: PropTypes.bool,
        logOut: PropTypes.func,
    };
}

export default App;
