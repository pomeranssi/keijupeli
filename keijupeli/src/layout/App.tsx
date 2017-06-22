import * as React from 'react'
import GameArea from './GameArea'
import {GameControl} from '../game/GameControl'
import ItemList from '../game/ItemList'
import {Category} from '../game/Items'
const logo = require('./images/fairy.svg')
import './App.css'
import CategoryList from '../game/CategoryList'

export default class App extends React.Component<{}, {
    category?: Category
}> {
    gameControl: GameControl
    categoryList: CategoryList

    componentWillMount() {
        this.setState({category: undefined})
    }
    render() {
        return (
            <div className="App">
                <div className="App-main">
                    <GameArea ref={r => this.gameControl = r} getEventListener={() => this.categoryList}/>
                    <br />
                </div>
                <div className="App-toolbar primary">
                    <div className="LogoArea">
                        <div className="Logo">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <h1>Keijupeli</h1>
                    </div>
                    <CategoryList getGameControl={() => this.gameControl} ref={r => this.categoryList = r}
                                  setCategory={c => this.setState({category: c})} />
                </div>
                <div className="App-toolbar secondary">
                    <ItemList getGameControl={() => this.gameControl} category={this.state.category}/>
                </div>
            </div>
        )
    }
}
