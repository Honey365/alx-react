import React from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import './App.css';
import PropTypes from 'prop-types';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";

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
        if (event.ctrlKey && event.key === 'h') {
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
                        {this.props.isLoggedIn ?
                            <BodySectionWithMarginBottom title={"Course list"}>
                                <CourseList listCourses={this.listCourses} />
                            </BodySectionWithMarginBottom> :
                            <BodySectionWithMarginBottom title={"Log in to continue"}>
                                <Login />
                            </BodySectionWithMarginBottom>
                        }
                        <BodySection title="News from the school">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ex nec sem pulvinar maximus. Maecenas faucibus eleifend vestibulum. Nulla nunc lorem, sollicitudin condimentum massa nec, volutpat porta elit. Curabitur maximus lectus pharetra massa faucibus varius. Aliquam molestie, mauris vel facilisis tincidunt, neque tortor auctor diam, nec aliquam magna sem quis nunc. Pellentesque feugiat magna in elit posuere, vitae pulvinar nulla auctor. Donec tortor ligula, tempor ac auctor vel, consequat eget arcu. Vivamus congue ligula quis tellus bibendum congue. Praesent ut velit varius, fermentum mi convallis, eleifend arcu. Suspendisse feugiat purus eget lectus gravida, sit amet mollis tortor hendrerit. Donec fermentum tellus mauris, at rhoncus neque vehicula eleifend. Phasellus iaculis non enim sed dictum.

                                Praesent efficitur vestibulum est, vitae blandit diam hendrerit id. Donec sed vestibulum mauris. Mauris metus est, ultrices id tempus lobortis, molestie quis quam. Cras consequat nibh sed pulvinar varius. Nam interdum id velit hendrerit maximus. Donec maximus ligula eu nunc volutpat aliquam. Curabitur bibendum, lectus eget suscipit cursus, velit magna varius massa, sit amet ullamcorper risus ligula vel nulla. Donec tristique, ex eleifend molestie efficitur, eros nulla tincidunt neque, quis convallis nulla metus sit amet ex. Duis arcu sem, malesuada non rutrum sed, dignissim in nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam interdum nisl a ipsum mattis malesuada vel vitae velit.
                            </p>
                        </BodySection>

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
