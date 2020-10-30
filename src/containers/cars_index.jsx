import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getGarages } from '../actions/index';

class CarsIndex extends Component {
  componentWillMount() {
    this.props.getGarages(this.props.garage);
  }
  render() {
    return (
      <div className="view-container">
        <div className="aside">
          <div className="illustration" style={{ backgroundImage: "url(https://raw.githubusercontent.com/lewagon/garage-redux/master/assets/images/mechanic.jpg)" }} />
          <img src="https://raw.githubusercontent.com/lewagon/garage-redux/5f01e42e3cf43a30105cf7793a717f4a6e9400ee/assets/images/logo.svg" className="logo" alt="" />
          <h1>{this.props.garage}</h1>
          <p>Our garare is the best. Reasonable prices, always on time, we are the best (and fictional)</p>
          <Link to="/cars/new">Add a car</Link>
        </div>
        <div className="list-container">
          {this.props.cars.map((car) => {
            return (
              <div key={car.id} className="car-smallad">
                <Link to={`/cars/${car.id}`} />
                <img className="car-logo" src="https://raw.githubusercontent.com/lewagon/garage-redux/5f01e42e3cf43a30105cf7793a717f4a6e9400ee/assets/images/logo_square.svg"></img>
                <div className="car-details">
                  <ul>
                    <li><span>{car.brand} - {car.model}</span></li>
                    <li><span>Owner: </span>{car.owner}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getGarages },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    garage: state.garage,
    cars: state.cars,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
