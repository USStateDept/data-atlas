import React, {Component, PropTypes} from 'react';

import Dropzone from 'react-dropzone';

import {
   Icon 
} from 'antd';

class FileUploader extends Component {

  onDrop(acceptedFiles, rejectedFiles) {
    if(acceptedFiles.length > 0) {
      let file = acceptedFiles[0];
      this.props.beginLoadFileData(file);
    } else {
      // TODO report error
      console.log("DID NOT ACCEPT FILE")
    }
  }

  onDropComplete(dropped) {
    this.props.beginLoadFileData(dropped.file);
    return true;
  }

  render() {
    return (
      <Dropzone 
          onDrop={this.onDrop.bind(this)}
          accept=".csv"
          disableClick={false}
          className="Uploader-dropzone"
          >
          <div className="ant-upload ant-upload-drag">
          <span tabIndex="0" className="ant-upload ant-upload-btn" role="button">
            <div className="ant-upload-drag-container">
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </div>
          </span>
          </div>
      </Dropzone>
    );
  }
}

FileUploader.propTypes = {
  beginLoadFileData: PropTypes.func.isRequired
};

export default FileUploader;