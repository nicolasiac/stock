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
    deleteData(
      '/api/stocks',
      { transactionid: data.transactionid },
      res => {
      }
    );
  }

  _fetchStockInfo() {
    getData('/api/stocks/fetch', null, res => {
      console.log(res);
    });
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
          <div style={{ float: 'left', width: '50%' }}>
            Existing stocks
          <div>
              {items.map(item => (
                <div key={item.transactionid}>
                  #{item.stockid} {item.name}
                  <div>{item.date} {item.price} {item.shares} {item.transactionid}</div>
                  <div>
                    <button onClick={e => this._itemAdd(item)}>add</button>
                    <button onClick={e => this._itemSelected(item)}>edit</button>
                    <button onClick={e => this._itemDelete(item)}>delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            Add stock
          <AddStock itemAdded={this._itemAdded} selectedItem={selectedItem} />
            <div>Puppeteer</div>
            <button onClick={e => this._fetchStockInfo()}>Fetch</button>
          </div>
        </div>
      );
    }
  }
}

export default App;