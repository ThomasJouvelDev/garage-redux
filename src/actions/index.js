export const GET_GARAGES = 'GET_GARAGES';
export const CREATE_CAR = 'CREATE_CAR';
export const DELETE_CAR = 'DELETE_CAR';
export const FETCH_CAR = 'FETCH_CAR';

export function getGarages(garage) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`).then(response => response.json());
  return {
    type: GET_GARAGES,
    payload: promise
  };
}

export function createCar(body, garage, callback) {
  const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;
  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json())
    .then(callback);
  return {
    type: CREATE_CAR,
    payload: promise
  };
}

export function deleteCar(id) {
  const url = `https://wagon-garage-api.herokuapp.com/cars/${id}`;
  const promise = fetch(url, {
    method: 'DELETE'
  }).then(r => r.json());
  return {
    type: DELETE_CAR,
    payload: promise
  };
}

export function fetchCar(id) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`).then(response => response.json());
  return {
    type: FETCH_CAR,
    payload: promise
  };
}
