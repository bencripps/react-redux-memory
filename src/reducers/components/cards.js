import { GET_INITIAL_CARDS, SET_DIFFICULTY } from '../../constants/ActionTypes.js';
import { fromJS } from 'immutable';

const initialState = fromJS({
    deck: fromJS.List,
    difficulty: ''
});

export default function cards(state = initialState, action) {
    switch (action.type) {

    case GET_INITIAL_CARDS:
        return state.set('deck', action.cards);

    case SET_DIFFICULTY:
    	return state.set('difficulty', action.difficulty);

    default:
        return state;
    }
}