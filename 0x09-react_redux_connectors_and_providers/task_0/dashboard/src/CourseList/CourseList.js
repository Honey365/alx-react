import React from 'react';
import CourseListRow from './CourseListRow';
import CourseShape from "./CourseShape";
import PropTypes from "prop-types";
import {css, StyleSheet} from "aphrodite";


const styles = StyleSheet.create({
    table: {
        border: '1px solid #cccccc',
        width: '90%',
        margin: '30px auto auto',
        borderCollapse: 'collapse',
    },
});

function CourseList({ listCourses }) {
    return (
        <table id="CourseList" className={css(styles.table)}>
            <thead>
            <CourseListRow textFirstCell="Available courses" isHeader={true} />
            <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
            </thead>
            <tbody>
            {listCourses.length > 0 ? (
                listCourses.map(({ id, name, credit }) => (
                    <CourseListRow key={id} textFirstCell={name} textSecondCell={credit} />
                ))
            ) : (
                <CourseListRow textFirstCell="No course available yet" />
            )}
            </tbody>
        </table>
    );
}

CourseList.defaultProps = {
    listCourses: [],
};

CourseList.propTypes = {
    listCourses: PropTypes.arrayOf(CourseShape),
};

export default CourseList;
