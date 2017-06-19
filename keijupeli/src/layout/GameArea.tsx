import * as React from 'react'
import './GameArea.css'
import allItems, {Item} from '../game/items'

interface GameState {
    items: Item[]
}

class ItemElement extends React.Component<{item: Item}, null> {
    render() {
        return (
            <img src={this.props.item.img} className="Image" style={{
                left: this.props.item.left,
                top: this.props.item.top,
                zIndex: this.props.item.zIndex
            }}/>
        )
    }
}

export default class GameArea extends React.Component<{}, GameState> {
    componentWillMount() {
        this.setState({items: [].concat.apply([], allItems.map(c => c.items.filter(i => i.isDefault)))})
    }
    addItem(item: Item) {
        this.setState(s => ({items: s.items.concat(item)}))
    }
    render() {
        return (
            <div className="Game">
                <div className="Content">
                   {this.state.items.map(i => <ItemElement item={i} />)}
                   <br />
                </div>
            </div>
        )
    }
}
