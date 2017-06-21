import * as React from 'react'
import './GameArea.css'
import allItems, {Category, Item} from '../game/Items'
import {GameEventListener} from '../game/GameControl'

interface Map<V> {
    [key: string]: V
}
class Size {
    readonly width: number
    readonly height: number
    readonly scale: number
    constructor(width: number, height: number) {
        this.width = Math.max(width, 0)
        this.height = Math.max(height, 0)
        this.scale = width > 0 && height > 0 ? width / height : 0
    }
    minus(s: Size): Size {
        return new Size(this.width - s.width, this.height - s.height)
    }
}
interface GameState {
    items: Map<Item | undefined>,
    categories: Category[],
    windowSize: Size
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

const desiredSize = new Size(1024, 1024)
const areaPadding = new Size(220, 0)

export default class GameArea extends React.Component<{
    getEventListener: () => GameEventListener
}, GameState> {

    static getAreaScale(w: Size): number {
        if (w.width >= desiredSize.width && w.height >= desiredSize.height) {
            return 1
        }
        let scale = 1
        if (w.width < desiredSize.width) {
            scale = Math.min(scale, w.width / desiredSize.width)
        }
        if (w.height < desiredSize.height) {
            scale = Math.min(scale, w.height / desiredSize.height)
        }
        return scale
    }

    componentWillMount() {
        const cats = allItems.map(c => c)
        const its: Map<Item | undefined> = {}
        allItems.forEach(c => its[c.type] = c.items.find(i => i.isDefault!!))
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.setState({
            categories: cats,
            items: its,
            windowSize: desiredSize
        })
    }
    addItem(category: Category, item: Item) {
        this.setState(s => {
            const its = s.items
            its[category.type] = item
            return {items: its}
        })
    }
    removeItem(category: Category) {
        this.setState(s => {
            const its = s.items
            its[category.type] = undefined
            return {items: its}
        })
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ windowSize: new Size(window.innerWidth, window.innerHeight).minus(areaPadding)})
    }

    render() {
        return (
            <div className="Game">
                <div className="Content"
                     style={{ transform: `scale(${GameArea.getAreaScale(this.state.windowSize)})`}}>
                   {this.state.categories.map(c => {
                       const item = this.state.items[c.type]
                       return item ?
                           <ItemElement key={item.img} item={item} category={c}
                                        onClick={() => {
                                            this.removeItem(c)
                                            this.props.getEventListener().itemRemoved(c, item)
                                        }} /> :
                           undefined
                   }).filter(i => i !== undefined)}
                   <br />
                </div>
            </div>
        )
    }
}
