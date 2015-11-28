import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import { showAllCards } from '../actions/CardActions';
import { GAME_STATES, NOTIFICATIONS } from '../constants/GameConstants';
import { prefix } from '../util/prefix';
import '../style/components/notification.styl';

class Notification extends Component {

    getOutcome(gameState, outcome) {

        const guessTotal = gameState && gameState.totalIncorrectMoves 
            ? gameState.totalIncorrectMoves : 0;

        if (outcome === GAME_STATES.ONGOING) {
            return {
                type: GAME_STATES.ONGOING,
                message: `Incorrect Guesses: ${guessTotal}`,
                hidden: false
            };
        }

        else if (outcome === GAME_STATES.WON) {
            return {
                type: GAME_STATES.WON,
                message: NOTIFICATIONS.WON,
                hidden: false
            };
        }

        else if (outcome === GAME_STATES.LOST) {
            return {
                type: GAME_STATES.LOST,
                message: NOTIFICATIONS.LOST,
                hidden: false
            };
        }
    }

    render() {
        const { gameOutcome, gameState } = this.props;
        const outcome = this.getOutcome(gameState, gameOutcome);
        const notificationProps = {
            className: prefix('notification')
        };

        return (
            <div { ...notificationProps }>
                <span>
                    { outcome.message }
                </span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameOutcome: state.game.get('gameOutcome'),
        gameState: state.game.get('gameState')
    };
}

export default connect(mapStateToProps)(Notification);