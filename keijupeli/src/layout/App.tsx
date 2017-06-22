import * as React from 'react'
import ToolBar from './ToolBar'
import GameArea from './GameArea'
import {GameControl} from '../game/GameControl'
import ItemList from '../game/ItemList'
import {Category} from '../game/Items'
import './App.css'

export default class App extends React.Component<{}, {
    category?: Category
}> {
    gameControl: GameControl
    toolBar: ToolBar
    componentWillMount() {
        this.setState({category: undefined})
    }
    render() {
        return (
            <div className="App">
                <div className="App-main">
                    <GameArea ref={r => this.gameControl = r} getEventListener={() => this.toolBar.getEventListener()}/>
                    <br />
                </div>
                <div className="App-toolbar primary">
                    <ToolBar getGameControl={() => this.gameControl} ref={r => this.toolBar = r}
                             setCategory={c => this.setState({category: c})}/>
                </div>
                <div className="App-toolbar secondary">
                    <ItemList getGameControl={() => this.gameControl} category={this.state.category}/>
                </div>
            </div>
        )
    }
}
