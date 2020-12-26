import React from 'react';
import './App.css';
import { postData } from './common';

class AddStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            stockid: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.setState({ stockid: this.props.selectedItem.stockid });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();

        postData(
            '/api/stocks',
            this.state,
            res => {
                // this.$store.commit('items/addItem', res.data[0]);
                this.props.itemAdded(res.data);
            }
        );
    }

    render() {
        const { error } = this.state;
        const { selectedItem } = this.props;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input required id="name" name="name" type="text" value={selectedItem.name} onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input required id="date" name="date" type="date" onChange={this.handleChange}></input>
                        </div>
                        <div><label htmlFor="price">Price</label>
                            <input required id="price" name="price" type="number" step="0.01" onChange={this.handleChange}></input>
                        </div>
                        <div><label htmlFor="quantity">Quantity</label>
                            <input required id="quantity" name="quantity" type="number" step="0.01" onChange={this.handleChange}></input>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div >
            );
        }
    }
}

export default AddStock;