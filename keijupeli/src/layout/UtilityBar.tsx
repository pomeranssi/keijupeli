import * as React from 'react'
import {connect} from 'react-redux'
import './UtilityBar.css'
import {Game, randomize} from '../game/GameState'

export class UtilityBar extends React.Component<{
    onRandomize: () => void
}, {}> {
    render() {
        return (
            <div className="UtilityBar">
                <div className="App-icon" onClick={this.props.onRandomize}>
                    <img src={require('./images/icon-random.png')} className="App-icon-image" alt="logo" />
                </div>
            </div>
        )
    }
}

const StatefulUtilityBar = connect(
    (state: Game.State) => ({}),
    (dispatch) => ({onRandomize: () => { dispatch(randomize()) } })
)(UtilityBar)

export default StatefulUtilityBar
