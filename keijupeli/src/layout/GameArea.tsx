import * as React from 'react'
import './GameArea.css'
import allItems, {Item} from '../game/items'

interface Map<V> {
    [key: string]: V
}
interface GameState {
    items: Map<Item | undefined>,
    categories: string[]
}

const emptyItem: Item = {
    img: '',
    left: 0,
    top: 0
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
        const cats = allItems.map(c => c.type)
        const its: Map<Item | undefined> = {}
        allItems.forEach(c => its[c.type] = c.items.find(i => i.isDefault!!))
        this.setState({
            categories: cats,
            items: its
        })
    }
    addItem(category: string, item: Item) {
        this.setState(s => {
            const its = s.items
            its[category] = item
            return {items: its}
        })
    }
    render() {
        return (
            <div className="Game">
                <div className="Content">
                   {this.state.categories.map(i => this.state.items[i])
                       .filter(i => i !== undefined)
                       .map(i => <ItemElement item={i || emptyItem} />)}
                   <br />
                </div>
            </div>
        )
    }
}
