import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#deb5b545",
    },

    row: {
        backgroundColor: "#f5f5f5ab",
    },
});

function CourseListRow({isHeader, textFirstCell, textSecondCell }) {

  if (isHeader) {
    if (textSecondCell === null) {
      return (
          <tr className={css(styles.row)}>
            <th className={css(styles.header)} colSpan={2}>{textFirstCell}</th>
          </tr>
      );
    } else {
      return (
          <tr className={css(styles.row)}>
            <th className={css(styles.header)}>{textFirstCell}</th>
            <th className={css(styles.header)}>{textSecondCell}</th>
          </tr>
      );
    }
  } else {
    return (
        <tr className={css(styles.row)}>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </tr>
    );
  }
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
