import React, { Component } from 'react';
import './App.css';

import SortableTable from 'react-sortable-bootstrap-table';

const data = require('./data.json');
const rows = Object.keys(data).map(key => data[key]);
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'price', label: 'Price', sortable: true }
];

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <SortableTable rows={ rows } columns={ columns } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
