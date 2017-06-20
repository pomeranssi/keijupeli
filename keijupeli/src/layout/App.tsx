import * as React from 'react'
import ToolBar from './ToolBar'
import GameArea from './GameArea'
import './App.css'
import {GameControl} from '../game/GameControl'

export default class App extends React.Component<{}, null> {
    gameControl: GameControl
    render() {
        return (
            <div className="App">
                <div className="App-toolbar-container">
                    <div className="App-toolbar">
                        <ToolBar getGameControl={() => this.gameControl} />
                    </div>
                </div>
                <div className="App-main">
                    <GameArea ref={r => this.gameControl = r}/>
                    <br />
                </div>
            </div>
        )
    }
}
