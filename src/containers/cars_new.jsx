import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { createCar } from '../actions';

const required = value => value ? undefined : 'Required';
const plate = value => value && !/^[A0-Z9]+$/.test(value) ? 'Invalid plate, must be all cap & no special char' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label>{label}</label>
    <input className="form-control" placeholder={label} type={type} {...input} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(values, this.props.garage, (car) => {
      this.props.history.push('/'); // Navigate after submit return post;
      return car;
    });
  }


  render() {
    return (
      <div className="view-container">
        <div className="aside">
          <div className="illustration" style={{ backgroundImage: "url(https://raw.githubusercontent.com/lewagon/garage-redux/master/assets/images/mechanic.jpg)" }} />
          <img src="https://raw.githubusercontent.com/lewagon/garage-redux/5f01e42e3cf43a30105cf7793a717f4a6e9400ee/assets/images/logo.svg" className="logo" alt="" />
          <h1>{this.props.garage}</h1>
          <p>Our garare is the best. Reasonable prices, always on time, we are the best (and fictional)</p>
          <Link to="/">Back to list</Link>
        </div>
        <div className="form-container" style={{ backgroundImage: "url(https://raw.githubusercontent.com/lewagon/garage-redux/master/assets/images/form.jpg)" }}>
          <div className="overlay" />
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              label="Brand"
              name="brand"
              type="text"
              component={renderField}
              validate={required}
            />
            <Field
              label="Model"
              name="model"
              type="text"
              component={renderField}
              validate={required}
            />
            <Field
              label="Owner"
              name="owner"
              type="text"
              component={renderField}
              validate={required}
            />
            <Field
              label="Plate"
              name="plate"
              type="text"
              component={renderField}
              validate={[required, plate]}
            />
            <button className="btn" type="submit" disabled={this.props.invalid || this.props.pristine || this.props.submitting}>
              Add car
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { createCar })(CarsNew)
);
