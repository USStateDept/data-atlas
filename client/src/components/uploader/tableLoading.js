import React, {Component} from 'react';
import { Spin } from 'antd';

const TableLoading = ({colSize, rowSize} ) =>  {
  let cols = new Array(colSize || 6)
  cols.fill(1)
  let rows = new Array(rowSize || 10)
  rows.fill(1)

  return(
    <div className="ant-spin-nested-loading Uploader-table-loading">
    <div className="">
      <div className="ant-spin-spinning ant-table-with-pagination ant-table-spin-holder">
        <Spin size="large" />
      </div>
    </div>
    <div className="ant-spin-container ant-spin-blur">
      <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
        <div className="ant-table-content">
          <div className="">
            <span>
              <div className="ant-table-body">
                <table >
                  <thead className="ant-table-thead">
                    <tr>
                    {cols.map((n,i) => 
                      <th style={{width: '300px', height: '40px'}}></th>
                    )}
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                  {rows.map((n,i) => 
                    <tr className="ant-table-row  ant-table-row-level-0">
                      {cols.map((n,i) => 
                        <td style={{width: '300px', height: '60px'}}></td>
                      )}
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default TableLoading;
