import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Timeline,
  Progress,
  Icon,
  Row,
  Col
} from 'antd';

import * as ReporterActions from '../actions/reporter';


class Reporter extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    };
  }

  render() {
    let {
      fileLoaded,
      fileLoadError,
      fileUploadProgress,
      totalHeadersCount,
      mappedHeadersCount,
      nonValidHeaderMappings,
      validHeaderMappings,
      nonValidCellsToCorrect,
      messageLog
    } = this.props;

    let headersMappedPerc = Math.floor((mappedHeadersCount / totalHeadersCount) * 100);
    return (
      <div className="Reporter">
      {!fileLoaded && <h4> No Data Loaded </h4>}
      {fileLoaded &&
        <div className="Reporter-container">
        
        <Row className="Reporter-logger-row">
        <Col className="Reporter-logger-timeline" span={24}>
          <Timeline>
            {messageLog.map((message, i) => 
              <span key={i}>
              {message.valid && 
                <Timeline.Item color="green"><p className="Reporter-logger-row-text">{`${message.contextOf} -> ${message.contextTo} | ${message.text}`}</p></Timeline.Item>
              }
              {!message.valid &&
                <Timeline.Item 
                  dot={<Icon type="close-circle-o"/>} 
                  color="red">
                    <p className="Reporter-logger-row-text">
                      {`${message.contextOf} -> ${message.contextTo} | ${message.text}`}
                    </p>
                </Timeline.Item>
              }
              </span>
            )}
          </Timeline>
        </Col>
        </Row>

        <h5>Mapping Information</h5>
        <hr/>
        <br/>
         <Row gutter={16}>
            <Col className="Reporter-chart-dash-box" span={8}>
              <Progress type="circle" percent={headersMappedPerc} width={80} />
              <p>Headers Mapped</p>
            </Col>
            <Col className="Reporter-chart-dash-box" span={8}>
              <p className="Reporter-chart-dash-number">{nonValidCellsToCorrect}</p>
              <p>Cells Need Correction</p>
            </Col>
            <Col className="Reporter-chart-dash-box" span={8}>
              <Progress type="circle" percent={0} width={80} />
              <p>Other Stat</p>
            </Col>
          </Row>
        </div>
      } 
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { 
    reporter,
    uploader: {present}
  } = state;

  let 
    fileUploadProgress = present.get('fileUploadProgress'),
    fileLoaded = present.get('fileLoaded'),
    fileLoadError = present.get('fileLoadError'),
    reporting = present.get('reporting')

  let 
    totalHeadersCount = reporting.get('totalHeadersCount'),
    mappedHeadersCount = reporting.get('mappedHeadersCount'),
    nonValidHeaderMappings = reporting.get('nonValidHeaderMappings'),
    validHeaderMappings = reporting.get('validHeaderMappings'),
    nonValidCellsToCorrect = reporting.get('nonValidCellsToCorrect'),
    messageLog = reporting.get('messageLog')

  return {
    fileLoaded,
    fileLoadError,
    fileUploadProgress,
    totalHeadersCount,
    mappedHeadersCount,
    nonValidHeaderMappings,
    validHeaderMappings,
    nonValidCellsToCorrect,
    messageLog
  }

  

  return {
    fileUploadProgress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReporterActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Reporter);