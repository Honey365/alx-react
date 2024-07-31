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

    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <div className="root-notifications">
                        <Notifications listNotifications={this.listNotifications} />
                    </div>
                    <Header />
                    <div className="App-body">
                        {this.props.isLoggedIn ? <CourseList listCourses={this.listCourses} /> : <Login />}
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        );
    }

    static defaultProps = {
        isLoggedIn: false,
    };

    static propTypes = {
        isLoggedIn: PropTypes.bool,
    };
}

export default App;
