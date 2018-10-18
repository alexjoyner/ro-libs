import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GoGraph, GoGear, GoCheck } from 'react-icons/go';
import { Panel } from '../../atoms/Panel';
import { Gauge } from '../../atoms/Gauge';
import { Button } from '../../atoms/Button';

const GaugeBlockBtnContainer = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
`;
const SettingsBtnContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const GraphBlockLabel = styled.div`
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

const GaugeBlock = props => (
  <Panel width={props.panelWidth || '20%'} >
    <GaugeBlockBtnContainer>
      {(props.multiSelected) ? (
        <Button size="xsmall" color="success" >
          <GoCheck size={20} />
        </Button>
        ) : (
          <Button size="xsmall" color="dark" onClick={props.onChartClick}>
            <GoGraph size={20} />
          </Button>
        )}
    </GaugeBlockBtnContainer>
    <SettingsBtnContainer>
      <Button size="xsmall" color="dark" onClick={props.onSettingsClick} >
        <GoGear size={20} />
      </Button>
    </SettingsBtnContainer>
    <Gauge
      {...props}
    />
    <GraphBlockLabel>{props.label}</GraphBlockLabel>
  </Panel>
);

GaugeBlock.propTypes = {
  panelWidth: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChartClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  multiSelected: PropTypes.bool,
};

GaugeBlock.defaultProps = {
  panelWidth: '20%',
  multiSelected: false,
};

export { GaugeBlock };
