import React from 'react';
import PropTypes from 'prop-types';

const TickMark = props => (
  <line
    x1="1"
    y1="150"
    x2="15"
    y2="150"
    stroke="#34495e"
    strokeLinecap="round"
    transform={`rotate(${props.angle} 125 150)`}
  />
);
TickMark.propTypes = {
  angle: PropTypes.number.isRequired,
};

export { TickMark };
