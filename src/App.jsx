import React, { useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useState, useEffect } from 'react';

const TableData = () => {
  const gridRef = useRef();

  const [tableData, setTableData] = useState([]);
  const [gridApi, setGridApi] = useState();
  const url = 'http://localhost:4000/electricity'

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch(url).then(resp => resp.json()).then(resp => {
      setTableData(resp);
    }
    )
  }

  const getDynamicData = (obj) => {
    return Object.keys(obj).map(key => ({ field: key }))
  }

  const onGridReady = (params) => {
    setGridApi(params);
    params.api.setColumnDefs(getDynamicData(tableData[0]))
  }

  const cellClickedListenor = (e) => {
    console.log("clicked", e)
  }

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      rowData: null,
      enableRowGroup: true,
      enablePivot: true,
    };
  }, []);

  return (

    <div className='ag-theme-alpine'
      style={{
        height: "1030px",
        width: "1850px",
        overflow: "none"
      }}
    >
      <>
        {tableData.length > 0 ? <AgGridReact
          className='ag-grid'
          style={{ position: "fixed", scroll: "none" }}
          rowGroupPanelShow="always"
          animateRows={true}
          ref={gridRef}
          rowData={tableData}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onCellClicked={cellClickedListenor}
          rowSelection="multiple"
        /> : ''}
      </>
    </div>
  )
}
export default TableData;
