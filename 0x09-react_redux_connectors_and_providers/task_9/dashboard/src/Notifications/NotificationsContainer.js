import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNotifications, markAsRead, setNotificationFilter,} from "../actions/notificationActionCreators";
import { getUnreadNotificationsByType } from "../selectors/notificationSelector";
import Notifications from "./Notifications";
import PropTypes from "prop-types";

export class NotificationsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchNotifications();
    }

    render() {
        return <Notifications {...this.props}></Notifications>;
    }
}

NotificationsContainer.defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
    fetchNotifications: () => {},
    setNotificationFilter: () => {},
};

NotificationsContainer.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.array,
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func,
    fetchNotifications: PropTypes.func,
    setNotificationFilter: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        listNotifications: getUnreadNotificationsByType(state),
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        fetchNotifications: function () {
            dispatch(fetchNotifications());
        },
        markNotificationAsRead: function (index) {
            dispatch(markAsRead(index));
        },
        setNotificationFilter: function (index) {
            dispatch(setNotificationFilter(index));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
