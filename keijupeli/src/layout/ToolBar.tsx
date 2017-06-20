import * as React from 'react'
import CategoryList from '../game/CategoryList'
import {GameControl} from '../game/GameControl'
import './ToolBar.css'

const logo = require('./images/fairy.svg')

export default class ToolBar extends React.Component<{
    getGameControl: () => GameControl
}, null> {
    render() {
        return (
            <div className="ToolBar">
                <div className="LogoArea">
                    <div className="Logo">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <h1>Keijupeli</h1>
                </div>
                <CategoryList getGameControl={this.props.getGameControl} />
            </div>
        )
    }
}
