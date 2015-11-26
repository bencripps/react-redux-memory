import React, {PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard.jsx';
import { DIFFICULTY_LEVELS, DEFAULT_DIFFICULTY } from '../constants/GameConstants';
import '../style/components/gameboard.styl';
import { prefix } from '../util/prefix';

class GameBoard extends Component {

    static propTypes = {
        app: PropTypes.object,
        cards: PropTypes.array
    };

    getBoardSize(difficulty) {
        const levels = Object.keys(DIFFICULTY_LEVELS);
        return levels.indexOf(difficulty) !== -1 ? difficulty.toLowerCase() : DEFAULT_DIFFICULTY.toLowerCase();
    }

    render() {
        const { cards, difficulty } = this.props;
        const renderedCards = cards.length > 0
                ? cards.map((card) => <GameCard { ...card } key={ btoa(card.id) } /> ) : <div>Loading...</div>;
        
        const boardSize = this.getBoardSize(difficulty);
        const boardProps = {
            className: prefix('gameboard', boardSize)
        }

        return (
            <div { ...boardProps }>
                { renderedCards }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards.get('deck'),
        difficulty: state.cards.get('difficulty')
    };
}

export default connect(mapStateToProps)(GameBoard);