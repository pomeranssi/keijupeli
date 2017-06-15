import * as React from 'react'
import ToolBar from './ToolBar'
import GameArea from './GameArea'
import './App.css'

export default class App extends React.Component<{}, null> {
    render() {
        return (
            <div className="App">
                <div className="App-toolbar">
                    <ToolBar />
                </div>
                <div className="App-main">
                    <GameArea />
                </div>
            </div>
        )
    }
}
