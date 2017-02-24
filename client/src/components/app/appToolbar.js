import React, {Component, PropTypes} from 'react';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class TableToolbar extends Component {

  render() {
    let {
      disableSubmit,
      disableCancel,
      disableReset
    } = this.props;

    let toolbarItems = [
      {
        "text": "File", 
        "subMenu": [
          {"name": 'Upload', "iconType": 'cloud-upload-o', "classAppend": 'App-toolbar-enabled' },
          {"name": 'Reset All', "iconType": 'reload', "classAppend": disableReset ? 'App-toolbar-disabled' : 'App-toolbar-enabled' },
          {"name": 'Cancel', "iconType": 'close-circle-o', "classAppend": disableCancel ? 'App-toolbar-disabled' : 'App-toolbar-enabled'  },
          {"name": 'Submit', "iconType": 'save', "classAppend": disableSubmit ? 'App-toolbar-disabled' : 'App-toolbar-enabled' }
        ]
      },
      {
        "text": "Edit", 
        "subMenu": [
          {"name": 'Undo', "iconType": 'rollback' },
          {"name": 'Redo', "iconType": 'rollback', "classExt": 'flip-horizontal' },
        ]
      },
      {
        "text": "Tools", 
        "subMenu": [
          {"name": 'History', "iconType": 'bars' },
          {"name": 'Search File', "iconType": 'search' }
        ]
      }
    ];

    return (
      <div className="App-toolbar">
        <Tabs animated={false} type="card" defaultActiveKey="0" onChange={this.callback}>
            {toolbarItems.map((item,i) => 
              <TabPane tab={item.text} key={i}>
                {item.subMenu.map((sub,i) => 
                  <div  key={i} className={`App-toolbar-item text-center ${sub.classAppend}`}>
                    <Icon className={`App-toolbar-item-icon`} type={sub.iconType} />
                    <p className="App-toolbar-item-text">{sub.name}</p>
                  </div>
                )}
          
              </TabPane>
            )}
        </Tabs>  
      </div>
    );
  }
}

TableToolbar.propTypes = {
  // TODO
  someAction: PropTypes.func
};

export default TableToolbar;