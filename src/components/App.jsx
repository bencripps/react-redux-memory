import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import GameBoard from './GameBoard.jsx';
import Notification from './Notification.jsx';
import { queryUtil } from '../util/query'; 
import { getInitialCards, setDifficulty } from '../actions/CardActions';
import { DIFFICULTY_LEVELS, DEFAULT_DIFFICULTY } from '../constants/GameConstants';

class App extends Component {

    static defaultProps = {
        difficulty: DIFFICULTY_LEVELS[DEFAULT_DIFFICULTY]
    };

    componentWillMount() {
        const difficulty = this.getDifficulty();
        const cardCount = DIFFICULTY_LEVELS[difficulty] ? DIFFICULTY_LEVELS[difficulty] : this.props.difficulty;
        store.dispatch(getInitialCards(cardCount));
        store.dispatch(setDifficulty(difficulty));
    }

    getDifficulty() {
        return queryUtil('DIFFICULTY');
    }

    render() {
        return (
            <div>
                <Notification />
                <GameBoard />
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(App);