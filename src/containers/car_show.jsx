import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { deleteCar, fetchCar } from '../actions';

class CarShow extends Component {
  componentDidMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  render() {
    if (!this.props.car) {
      return <p>Loading . . .</p>;
    }

    return (
      <div className="view-container">
        <div className="aside">
          <div className="illustration" style={{ backgroundImage: "url(https://raw.githubusercontent.com/lewagon/garage-redux/master/assets/images/mechanic.jpg)" }} />
          <img src="https://raw.githubusercontent.com/lewagon/garage-redux/5f01e42e3cf43a30105cf7793a717f4a6e9400ee/assets/images/logo.svg" className="logo" alt="" />
          <h1>{this.props.garage}</h1>
          <p>Our garare is the best. Reasonable prices, always on time, we are the best (and fictional)</p>
          <Link to="">Back to list</Link>
        </div>
        <div className="car-container">
          <div className="car-card">
            <img className="car-picture" src="https://raw.githubusercontent.com/lewagon/garage-redux/5f01e42e3cf43a30105cf7793a717f4a6e9400ee/assets/images/logo_square.svg"></img>
            <div className="car-details">
              <ul>
                <li><span>{this.props.car.brand} - {this.props.car.model}</span></li>
                <li><span>Owner: </span>{this.props.car.owner}</li>
                <li className="plate">{this.props.car.plate}</li>
              </ul>
              <Link to="/">
                <button className="delete" onClick={() => this.props.deleteCar(this.props.car.id)}>DELETE</button> 
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { deleteCar, fetchCar },
    dispatch
  );
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
  const car = state.cars.find(p => p.id === idFromUrl);
  return { car, garage: state.garage };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow);
