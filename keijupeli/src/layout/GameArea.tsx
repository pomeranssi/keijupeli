import * as React from 'react'
import './GameArea.css'
import allItems, {Category, Item} from '../game/Items'

interface Map<V> {
    [key: string]: V
}
interface GameState {
    items: Map<Item | undefined>,
    categories: Category[]
}

class ItemElement extends React.Component<{item: Item, category: Category, onClick: () => void}, null> {
    render() {
        return (
            <img
                src={this.props.item.img}
                className={`Image ${this.props.category.type}`}
                style={{
                    left: this.props.item.left,
                    top: this.props.item.top,
                    zIndex: this.props.item.zIndex
                }}
                onClick={this.props.onClick} />
        )
    }
}

export default class GameArea extends React.Component<{}, GameState> {
    componentWillMount() {
        const cats = allItems.map(c => c)
        const its: Map<Item | undefined> = {}
        allItems.forEach(c => its[c.type] = c.items.find(i => i.isDefault!!))
        this.setState({
            categories: cats,
            items: its
        })
    }
    addItem(category: Category, item: Item) {
        this.setState(s => {
            const its = s.items
            its[category.type] = item
            return {items: its}
        })
    }
    removeItem(category: Category, item: Item) {
        this.setState(s => {
            const its = s.items
            its[category.type] = undefined
            return {items: its}
        })
    }
    render() {
        return (
            <div className="Game">
                <div className="Content">
                   {this.state.categories.map(c => {
                       const item = this.state.items[c.type]
                       return item ?
                           <ItemElement key={item.img} item={item} category={c}
                                        onClick={() => this.removeItem(c, item)} /> :
                           undefined
                   }).filter(i => i !== undefined)}
                   <br />
                </div>
            </div>
        )
    }
}
