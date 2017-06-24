import * as React from 'react'
import GameArea from './GameArea'
import ItemList from '../game/ItemList'
const logo = require('./images/fairy.svg')
import './App.css'
import CategoryList from '../game/CategoryList'
import UtilityBar from './UtilityBar'

export default class App extends React.Component<{}, {}> {

    componentWillMount() {
        this.setState({category: undefined})
    }
    render() {
        return (
            <div className="App">
                <div className="App-main">
                    <GameArea />
                    <br />
                </div>
                <div className="App-toolbar primary">
                    <div className="LogoArea">
                        <div className="Logo">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <h1>Keijupeli</h1>
                    </div>
                    <CategoryList />
                </div>
                <div className="App-toolbar secondary">
                    <ItemList />
                </div>
                <div className="App-toolbar tertiary">
                    <UtilityBar />
                </div>
            </div>
        )
    }
}
