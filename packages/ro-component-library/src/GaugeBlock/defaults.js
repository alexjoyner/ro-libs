import React from 'react';
import styled from 'styled-components';
import { Panel } from '../Panel';
import { Gauge } from '../Gauge';
import { Button } from '../Button';

const StatusLabel = ({ children, ...props }) => (
  <span style={{ fontSize: '13px' }} {...props}>
    {children}
  </span>
);

// const GaugeBlockBtnContainer = styled.div`
//   position: absolute;
//   left: 5px;
//   top: 5px;
// `;
const GaugeBlockToolbar = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const GaugeBlockLabel = styled.div`
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

export default {
  GaugeBlockContainer: Panel,
  GaugeBlockToolbar,
  GaugeBlockChartsBtn: Button,
  GaugeBlockSettingsBtn: Button,
  GaugeBlockGauge: Gauge,
  GaugeBlockLabel,
  GaugeBlockStatus: StatusLabel,
};
