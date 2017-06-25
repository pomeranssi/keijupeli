import * as React from 'react'
import {connect} from 'react-redux'
import {Game, randomize} from '../game/GameState'
import './UtilityBar.css'

export class UtilityBar extends React.Component<{
    onRandomize: () => void
}, {}> {
    render() {
        return (
            <div className="UtilityBar">
                <div className="AppIcon" onClick={this.props.onRandomize}>
                    <img src={require('./images/icon-random.png')} className="AppIconImage" alt="logo" />
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
