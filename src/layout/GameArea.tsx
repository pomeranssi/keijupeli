import * as React from 'react'
import allItems, {Category, Item} from '../game/Items'
import {connect} from 'react-redux'
import {Game, removeItem} from '../game/GameState'
import './GameArea.css'

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
const areaPadding = {landscape: new Size(200, 0), portrait: new Size(0, 200)}

interface GameAreaProps {
    items: Game.SelectedItems,
    onRemove: (category: Category) => void
}
interface GameState {
    windowSize: Size
}

export class GameArea extends React.Component<GameAreaProps, GameState> {

    categories: Category[]

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

    constructor(props: GameAreaProps) {
        super(props)
        this.categories = allItems
    }

    componentWillMount() {
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.setState({windowSize: desiredSize})
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        const isLandscape = window.innerWidth >= window.innerHeight
        this.setState({ windowSize: new Size(window.innerWidth, window.innerHeight)
            .minus(areaPadding[isLandscape ? 'landscape' : 'portrait'])})
    }

    render() {
        return (
            <div className="Game">
                <div className="Content"
                     style={{ transform: `scale(${GameArea.getAreaScale(this.state.windowSize)})`}}>
                   {this.categories.map(c => {
                       const item = this.props.items[c.type]
                       return item ?
                           <ItemElement key={item.img} item={item} category={c}
                                        onClick={() => {this.props.onRemove(c)}} /> :
                           undefined
                   }).filter(i => i !== undefined)}
                   <br />
                </div>
            </div>
        )
    }
}

const StatefulGameArea = connect(
    (state: Game.State) => ({ items: state.selectedItems }),
    (dispatch) => ({onRemove: (category: Category) => { dispatch(removeItem(category)) } })
)(GameArea)

export default StatefulGameArea
