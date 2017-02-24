import React, {Component, PropTypes} from 'react';

import { 
  Row,
  Col,
  Card, 
  Icon,
  Badge
} from 'antd';

class HeaderMapper extends Component {

  generateUnmappedCardTitle(header, schemaOptions, onChangeEvent) {
    console.log(schemaOptions)
    let fieldOptions = schemaOptions.properties.filter((field) => {return !field.validated;})

    return (
      <span>
      <Icon type="link" className="Uploader-table-header-icon-neglet" />{' ' + header.get('id')}
      <br/>
      <Icon type="arrow-right Header-map-pointer" />{'   '}
        <select onChange={(e) => { onChangeEvent(e,fieldOptions, header) } }>
          {schemaOptions && fieldOptions.map((col,i) => 
            <option key={i} value={i}>{col.column}</option>
          )}
        </select>
       </span>
    ) 
  }

  generateMappedCardTitle(header) {
    let status = header.get('rowsPassedFailed') === 0 
      ? "success"
      : "error";

    return (
      <span>
        <Badge status={status} /> {header.get('id')}
        <br/> 
        <Icon type="arrow-right Header-map-pointer" /> {header.get('headerMap').column}
      </span>
    )
  }

  generateCardBody(rulesFailed){
    if(rulesFailed.size === 0) {
      return <p>All Checks Passed</p>
    }
    return rulesFailed.map(body => {
      return <p className="Header-map-error-link" onClick={() => {this.props.showTableFocusCell(body.cell)}} >Cell Error: {body.rule.check}</p>
    })
  }

  render() {
    const {
      headerData,
      schemaOptions,
      headerMappedFromDropDown
    } = this.props;

    let mappedHeaders = headerData.filter(header => header.get('headerMapped'));
    let unmappedHeaders = headerData.filter(header => !header.get('headerMapped'));
     
    return (
        <div className="Uploader-header-mappings">
        {!schemaOptions && <h1>Choose a schema from right </h1>}
          
          {schemaOptions && mappedHeaders.size > 0 && 
              <span>
                <h2> Mapped </h2>
                <hr/>
                <br/>
                <Row gutter={16}>
                {mappedHeaders.map((header,i) => 
                  <Col key={i} span={8}>
                    <Card title={this.generateMappedCardTitle(header)}>
                      {this.generateCardBody(header.get('allRulesFailed'))}
                    </Card>
                  </Col>
                  
                )}
                </Row>
              </span>
            }
            
            
            {schemaOptions && unmappedHeaders.size > 0 && 
              <span>
                <h2> Unmapped </h2>
                <hr/>
                <br/>
                <Row gutter={16}>
                {unmappedHeaders.map((header,i) => 
                  <Col key={i} span={8}>
                    <Card title={this.generateUnmappedCardTitle(header,schemaOptions,headerMappedFromDropDown)}>
                      
                    </Card>
                  </Col>
                )}
                </Row>
              </span>
            }
          
        </div>
    );
  }
}

HeaderMapper.propTypes = {
  headerData: PropTypes.object.isRequired
};

export default HeaderMapper;