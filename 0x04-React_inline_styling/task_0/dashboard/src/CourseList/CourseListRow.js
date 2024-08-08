import React from "react";
import PropTypes from "prop-types";

const rowStyling = {
    backgroundColor: "#f5f5f5ab",
};

const headerStyling = {
    backgroundColor: "#deb5b545",
};

function CourseListRow({isHeader, textFirstCell, textSecondCell }) {

  if (isHeader) {
    if (textSecondCell === null) {
      return (
          <tr style={rowStyling}>
            <th style={headerStyling} colSpan={2}>{textFirstCell}</th>
          </tr>
      );
    } else {
      return (
          <tr style={rowStyling}>
            <th style={headerStyling}>{textFirstCell}</th>
            <th style={headerStyling}>{textSecondCell}</th>
          </tr>
      );
    }
  } else {
    return (
        <tr style={rowStyling}>
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
