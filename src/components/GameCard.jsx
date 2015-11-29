import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import '../style/components/card.styl';
import { prefix } from '../util/prefix';
import { idSanitizer } from '../util/idSanitizer';
import { 
    CARD_STATE,
    SHOW_DELAY,
    ACTIVE_CLASS,
    MATCHED_CLASS,
    GAME_STATES } from '../constants/GameConstants';
import { moveOccured, matchOccurred, noMatchOccurred } from '../actions/CardActions';

class GameCard extends Component {

    static propTypes = {
        cards: PropTypes.array.isRequired,
        id: PropTypes.string.isRequired,
        gameState: PropTypes.object,
        value: PropTypes.string, 
        src: PropTypes.string, 
        gameState: PropTypes.object,
        gameOutcome: PropTypes.string,
    }

    handleClick(key, cardState, gameState, cardCount) {

        if (cardState.state === CARD_STATE.SELECTED 
            || cardState.state === CARD_STATE.MATCHED
            || this.isMoveInProgress(gameState)) {
            return false;
        }


        else if (cardState.lastMove === idSanitizer(key)) {
            store.dispatch(matchOccurred(key,  gameState.correctMatches, cardCount));
        }

        else if (cardState.moveCount === 1) {
            store.dispatch(moveOccured(key, CARD_STATE.SELECTED, cardState.moveCount));

            setTimeout(store.dispatch.bind(
                this, 
                noMatchOccurred(gameState, key, gameState.totalIncorrectMoves)
            ), SHOW_DELAY);
        }

        else if (cardState.state === CARD_STATE.UNSELECTED) {
            store.dispatch(moveOccured(key, 
                CARD_STATE.SELECTED, 
                this.incrementCounter(cardState.moveCount))
            );
        }
    }

    isMoveInProgress(gameState) {

        if (!gameState || !gameState.lastMove) {
            return false;
        }

        const id = idSanitizer(gameState.lastMove);
        const totalSelected = Object.keys(gameState).filter((k) => gameState[k] === CARD_STATE.SELECTED);

        if (totalSelected.length === 2) {
            return true;
        }

        else {
            return gameState[id] === CARD_STATE.SELECTED;
        }
        
    }

    incrementCounter(currentCount) {
        return currentCount+= 1;
    }

    getCurrentState(gameState, id, lastMove) {
        if (!gameState) {
            return {
                state: CARD_STATE.UNSELECTED,
                lastMove: null,
                moveCount: null
            };
        }

        if (gameState[id]) {
            return {
                state: gameState[id],
                lastMove: gameState.lastMove,
                moveCount: gameState.moveCount
            };
        }

        else {
            return {
                state: CARD_STATE.UNSELECTED,
                lastMove: gameState.lastMove,
                moveCount: gameState.moveCount
            };
        }
    }

    render() {
        const { value, src, gameState, id, cards, gameOutcome } = this.props;
        const cardState = this.getCurrentState(gameState, id);
        const isSelected = cardState.state === CARD_STATE.SELECTED 
                            || cardState.state === CARD_STATE.MATCHED
                            || gameOutcome === GAME_STATES.WON
                            || gameOutcome === GAME_STATES.LOST
        const cardCount = cards ? cards.length : 0;
        const cardClasses = cardState.state === CARD_STATE.MATCHED ? ['card', MATCHED_CLASS]: ['card'];

        const cardProps = {
            className: prefix( ...cardClasses ),
            onClick: this.handleClick.bind(this, id, cardState, gameState, cardCount)
        };

        const imgProps = {
            src: isSelected ? `images/cards/${src}` : `images/cards/back.jpeg`,
            className: isSelected ? prefix(ACTIVE_CLASS) : null
        };

        return (
            <div { ...cardProps } >
                <span>
                    <img { ...imgProps } />
                </span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards.get('deck'),
        gameState: state.game.get('gameState'),
        gameOutcome: state.game.get('gameOutcome')
    };
}

export default connect(mapStateToProps)(GameCard);