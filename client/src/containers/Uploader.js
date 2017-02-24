import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import * as  UploaderActions from '../actions/uploader';
import * as  SchemaActions from '../actions/schemas';

import FileUploader from '../components/uploader/fileUploader';
import TableLoading from '../components/uploader/tableLoading';
import HeaderMapper from '../components/uploader/headerMapper';

import DataGrid from '../components/uploader/DataGrid/DataGrid';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1"
    }
  }

  evaluateDraggedHeader(header, dropTarget) {
    this.props.endHeaderDragDropped(header);
    if(dropTarget) {
      this.props.dropTargetRecieveHeader(dropTarget,header);
      this.props.endHeaderDragDroppedMapped(header,dropTarget);
    }  
  }

  headerMappedFromDropDown(e, targetList, header) {
    let dropTarget = targetList[parseInt(e.target.value,10)];
    this.props.dropTargetRecieveHeader(dropTarget,header);
    this.props.endHeaderDragDroppedMapped(header,dropTarget);
  }

  cellValueChange(newVal, cell) {
    this.props.dispatchUpdateCellValue(newVal, cell)
  }

  cellValueBlur(cell) {
    this.props.revalidateSingleCell(cell)
  }

  showTableFocusCell(cellID) {
    this.setState({
      activeKey: "1"
    }, () => {
      document.getElementById(cellID).focus();
    })
  }


  tabOnChange(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    
    const {
      headerData,
      tableData,
      fileLoading,
      fileLoaded,
      fileLoadError,
      availableSchemaOptions,

      // actions
      beginHeaderDrag,
      beginLoadFileData,
      dispatchUploadFileProgress,
      endHeaderDragDroppedMapped
    } = this.props;


    let display = fileLoaded && !fileLoading && !fileLoadError;

    return (
      <div className="Uploader">
        <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.tabOnChange.bind(this)}>
          <TabPane tab="Upload Table" key="1">
            <div className="Datatable-container">
              {display && 
                <DataGrid
                  tableData={tableData} 
                  headerData={headerData}
                  beginHeaderDrag={beginHeaderDrag}
                  headerDroppedAction={this.evaluateDraggedHeader.bind(this)}
                  handleCellChangeAction={this.cellValueChange.bind(this)}
                  handleCellBlurAction={this.cellValueBlur.bind(this)}
                  updateRenderProgress={dispatchUploadFileProgress}
                />
              }
              {!fileLoaded && !fileLoading && 
                <FileUploader
                  beginLoadFileData={beginLoadFileData}
                  fileLoadError={fileLoadError}
                />  
              }
              {!fileLoaded && fileLoading &&
                <TableLoading />
              }
              </div>
          
          </TabPane>
          <TabPane tab="Map Headers" key="2">
          
            {display &&
              <HeaderMapper
                headerData={headerData}
                showTableFocusCell={this.showTableFocusCell.bind(this)}
                schemaOptions={availableSchemaOptions}
                headerMappedFromDropDown={this.headerMappedFromDropDown.bind(this)}
              />
            }
          
          </TabPane>
        </Tabs>      
      </div>
    );
  }
}

Uploader.propTypes = {
  fileLoaded: PropTypes.bool.isRequired,
  fileLoading: PropTypes.bool.isRequired,
  fileLoadError: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  let { 
    uploader: {present},
    schemas
  } = state;
  
  const 
    tableData = present.get('tableData'),
    headerData  = present.get('headerData'),
    fileLoading  = present.get('fileLoading'),
    fileLoaded  = present.get('fileLoaded'),
    fileLoadError = present.get('fileLoadError'),
    fileErrorMessage = present.get('fileErrorMessage');

    const {
      availableSchemas,
      openSchemaIndex 
    } = schemas || {
      availableSchemas: [],
      openSchemaIndex: 0
    };
    
    let availableSchemaOptions = availableSchemas[openSchemaIndex];

  return {
    tableData,
    headerData,
    fileLoading,
    fileLoaded,
    fileLoadError,
    fileErrorMessage,
    availableSchemaOptions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},UploaderActions,SchemaActions), dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Uploader);