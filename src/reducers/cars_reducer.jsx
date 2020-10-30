import { GET_GARAGES, FETCH_CAR } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case GET_GARAGES:
      return action.payload;
    case FETCH_CAR:
      return [action.payload];
    default:
      return state;
  }
}
