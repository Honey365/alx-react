import PropTypes from "prop-types";
import React, { Component } from "react";
import BodySection from "./BodySection";
import {css, StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    appBodySectionWithMargin: {
        marginBottom: '40px'
    },
});

class BodySectionWithMarginBottom extends Component {
    render() {
        return (
            <div className={css(styles.appBodySectionWithMargin)}>
                <BodySection {...this.props} />
            </div>
        );
    }
}

BodySectionWithMarginBottom.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default BodySectionWithMarginBottom;
