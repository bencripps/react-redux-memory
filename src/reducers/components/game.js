import {
    MOVE_OCCURRED,
    MATCH_OCCURRED,
    NO_MATCH_OCCURRED,
    GAME_LOST,
    GAME_WON
} from '../../constants/ActionTypes.js';
import { CARD_STATE, GAME_STATES } from '../../constants/GameConstants';
import { fromJS } from 'immutable';

const initialState = fromJS({
    gameState: fromJS.Map,
    gameOutcome: GAME_STATES.ONGOING
});

export default function game(state = initialState, action) {
    switch (action.type) {

    case MOVE_OCCURRED:
    
        return state.set('gameState',
            Object.assign({}, state.get('gameState'),
                {
                    [action.key]: action.value,
                    lastMove: action.lastMove,
                    moveCount: action.moveCount
                }
            )
        );

    case MATCH_OCCURRED:

        return state.set('gameState',
            Object.assign({}, state.get('gameState'), {
                [`${action.key}_0`]: CARD_STATE.MATCHED,
                [`${action.key}_1`]: CARD_STATE.MATCHED,
                moveCount: 0,
                correctMatches: action.correctMatches
            })
        );

    case NO_MATCH_OCCURRED:

        return state.set('gameState',
            Object.assign({}, state.get('gameState'), {
                moveCount: 0,
                totalIncorrectMoves: action.incorrectMoves,
                lastMove: null,
                ...action.unmatched
            })
        );

    case GAME_WON: 

        return state.set('gameOutcome', GAME_STATES.WON);  

    case GAME_LOST: 

        return state.set('gameOutcome', GAME_STATES.LOST);

    default:
        
        return state;
    }
}