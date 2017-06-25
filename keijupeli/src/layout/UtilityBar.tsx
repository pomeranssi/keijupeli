import * as React from 'react'
import {connect} from 'react-redux'
import {Game, randomize, reset} from '../game/GameState'
import './UtilityBar.css'

export class UtilityBar extends React.Component<{
    onRandomize: () => void,
    onReset: () => void
}, {}> {
    render() {
        return (
            <div className="UtilityBar">
                <div className="AppIcon reset" onClick={this.props.onReset}>
                    <img src={require('./images/icon-reset.png')} className="AppIconImage" alt="Reset"
                         title="Aloita alusta" />
                </div>
                <div className="AppIcon randomize" onClick={this.props.onRandomize}>
                    <img src={require('./images/icon-random.png')} className="AppIconImage" alt="Randomize"
                        title="Kokeile onneasi!"/>
                </div>
            </div>
        )
    }
}

const StatefulUtilityBar = connect(
    (state: Game.State) => ({}),
    (dispatch) => ({
        onRandomize: () => { dispatch(randomize()) },
        onReset: () => { dispatch(reset()) }
    })
)(UtilityBar)

export default StatefulUtilityBar
