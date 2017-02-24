import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  Collapse,
  Icon
} from 'antd';

const Panel = Collapse.Panel;

import * as SchemaActions from '../actions/schemas';

import SchemaField from '../components/schemas/schemaField';


const SchemaFieldBase = ({properties}) => (
  <table className="Schema-choices">
  <tbody>
    {properties.map((field,i) =>
      <SchemaField
        key={i}
        field={field}
      />
    )}
    </tbody>
  </table>
  
);

class Schemas extends Component {
  componentDidMount() {
    this.props.getSchemaData();
  }

  openCloseSchema(key) {
    if(key) {
      this.props.dispatchOpenSchema(key)
    } else {
      this.props.dispatchCloseSchema()
    }
  }

  render() {
    const {
      availableSchemas,
      //activeSchemaId,
      schemasLoaded
    } = this.props;

    return (
      <div className="Schemas">
        <div className="Schemas-view">
          {schemasLoaded && 
            <Collapse 
              accordion
              onChange={this.openCloseSchema.bind(this)}
            >
              {availableSchemas.map((schema,i) => 
                <Panel header={(<span><Icon type="hdd" /> {schema.name}</span>)} key={i}>
                  <SchemaFieldBase properties={schema.properties} />
                </Panel>
              )}
            </Collapse>
          }
        </div>
      </div>
    );
  }
}

Schemas.propTypes = {
  availableSchemas: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  let { schemas } = state;

  const {
    availableSchemas,
    activeSchemaId,
    schemasLoaded
  } = schemas || {
    availableSchemas: [],
    activeSchemaId: '',
    schemasLoaded: false
  };
  return {
    availableSchemas,
    activeSchemaId,
    schemasLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SchemaActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Schemas);