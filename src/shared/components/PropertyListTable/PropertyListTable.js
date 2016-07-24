import React from 'react'
import { connect } from 'mobx-connect'
import ReactDataGrid from 'react-data-grid'

import PropertyList from 'components/PropertyList/PropertyList'
import SearchBar from 'components/SearchBar/SearchBar'

var _rows = [];
for (var i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}

//A rowGetter function is required by the grid to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count'
}
]

@connect
class PropertyListTable extends React.Component {

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={_rows.length}
          minHeight={500} />
      </div>
    )
  }
}

export default PropertyListTable
