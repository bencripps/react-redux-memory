import { combineReducers } from 'redux';
import cards from './components/cards';
import game from './components/game';

const rootReducer = combineReducers({
    cards,
    game
});

export default rootReducer;