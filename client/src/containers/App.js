import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as  AppActions from '../actions/app';

import Reporter from '../containers/Reporter';
import Schemas from '../containers/Schemas';
import Uploader from '../containers/Uploader';

import AppToolbar from '../components/app/appToolbar';

import { 
  Row,
  Col
} from 'antd';

import '../styles/index.css';

class App extends Component {

  submitFileForUpload() {

  }

  cancelUploadedFile() {

  }

  resetAllChangesMade() {

  }

  render() {
    let {
      fileLoading,
      fileLoaded,
      fileLoadError
    } = this.props;

    return (
      <div className="App">
      
        <AppToolbar 
          disableSubmit={!fileLoaded}
          disableCancel={!fileLoaded}
          disableReset={!fileLoaded}
          submitFileForUpload={this.submitFileForUpload.bind(this)}
          cancelUploadedFile={this.cancelUploadedFile.bind(this)}
          resetAllChangesMade={this.resetAllChangesMade.bind(this)}
        />

        <Row className="App-main-view">

            <Col span={14} className="App-left-view">
              <Uploader />
            </Col>

            <Col span={10} className="App-right-view">
              <Schemas />
              <Reporter />
            </Col>

        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { 
    uploader: {present}
  } = state;
  
  const 
    fileLoading  = present.get('fileLoading'),
    fileLoaded  = present.get('fileLoaded'),
    fileLoadError = present.get('fileLoadError');

  return {
    fileLoading,
    fileLoaded,
    fileLoadError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps,mapDispatchToProps)(App));