import React from 'react';
import './App.css';
import AddStock from './AddStock';
import { getData, deleteData } from './common';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      selectedItem: {}
    };

    this._itemAdded = this._itemAdded.bind(this);
    this._itemSelected = this._itemSelected.bind(this);
    this._itemAdd = this._itemAdd.bind(this);
    this._itemDelete = this._itemDelete.bind(this);
  }

  _itemAdded(item) {
    this.setState({ items: this.state.items.concat(item) });
  }

  componentDidMount() {
    getData('/api/stocks', null, res => {
      console.log(res);
      this.setState({
        isLoaded: true,
        items: res.data.items
      });
    });
  }

  _itemSelected(data) {
    this.setState({ selectedItem: data });
  }

  _itemAdd(data) {
    this.setState({ selectedItem: { stockid: data.stockid, name: data.name } });
  }

  _itemDelete(data) {
    console.log(data);
    deleteData(
      '/api/stocks',
      { transactionid: data.transactionid },
      res => {
      }
    );
  }

  render() {
    const { error, isLoaded, items, selectedItem } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          Existing stocks
          <ul>
            {items.map(item => (
              <li key={item.transactionid}>
                #{item.stockid} {item.name} {item.date} {item.price} {item.shares}{item.transactionid}
                <a href="#" onClick={e => this._itemAdd(item)}>add</a>&nbsp;
                <a href="#" onClick={e => this._itemSelected(item)}>edit</a>&nbsp;
                <a href="#" onClick={e => this._itemDelete(item)}>delete</a>
              </li>
            ))}
          </ul>
          <b>Add stock</b>
          <AddStock itemAdded={this._itemAdded} selectedItem={selectedItem} />
        </div>
      );
    }
  }
}

export default App;