import * as React from 'react'
import ToolBar from './ToolBar'
import GameArea from './GameArea'
import './App.css'

export default class App extends React.Component<{}, null> {
    gameArea: GameArea
    render() {
        return (
            <div className="App">
                <div className="App-toolbar">
                    <ToolBar onAddItem={i => this.gameArea.addItem(i)}/>
                    <br />
                </div>
                <div className="App-main">
                    <GameArea ref={r => this.gameArea = r}/>
                    <br />
                </div>
            </div>
        )
    }
}
