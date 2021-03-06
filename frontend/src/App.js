import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LaptopList from './LaptopList';
import LaptopDetail from './LaptopDetail';
class App extends Component {
  state = { laptops: [], details: [] };

  componentDidMount() {
    try {
      fetch('/api')
        .then(res => res.json())
        .then(laptops => this.setState({ laptops }));
    } catch (error) {
      console.log(error);
    }
  }

  getDetails = laptopName => {
    this.setState(({ laptops }) => ({
      details: laptops.filter(laptop => laptop.productname === laptopName),
    }));
  };

  render() {
    if (this.state.laptops.length < 1) {
      return <h1>Loading...</h1>;
    }

    return (
      <Router>
        <div className="container">
          <h1>The Laptop Store!</h1>
          <Route
            exact
            path="/"
            render={props => (
              <LaptopList
                {...props}
                laptops={this.state.laptops}
                getDetails={this.getDetails}
              />
            )}
          />
          <Route
            path="/detail/:productname"
            render={props => (
              <LaptopDetail {...props} details={this.state.details} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
