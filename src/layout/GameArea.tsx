import * as React from 'react'
import allItems, {Category, getImagePath, Item} from '../game/Items'
import {connect} from 'react-redux'
import {Game, moveItem, toggleItem} from '../game/GameState'
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

class ItemElement extends React.Component<{item: Item, category: Category, scale: number, onClick: () => void,
    onMove: (x: number, y: number) => void}, {}> {
    mouseX: number = 0
    mouseY: number = 0
    itemX: number = 0
    itemY: number = 0
    render() {
        return (
            <img
                src={getImagePath(this.props.item.fileName)}
                className={`Image ${this.props.category.type}`}
                style={{
                    left: this.props.item.left,
                    top: this.props.item.top,
                    zIndex: this.props.item.zIndex
                }}
                onDragStart={(event) => {
                    this.mouseX = event.pageX
                    this.mouseY = event.pageY
                    this.itemX = this.props.item.left
                    this.itemY = this.props.item.top
                }}
                onDrag={(event) => {
                    this.props.onMove(this.itemX + (event.pageX - this.mouseX) / this.props.scale,
                        this.itemY + (event.pageY - this.mouseY) / this.props.scale)
                }}
                onDragEnd={(event) => {
                    this.props.onMove(this.itemX + (event.pageX - this.mouseX) / this.props.scale,
                        this.itemY + (event.pageY - this.mouseY) / this.props.scale)
                }}
                draggable={true}
                onClick={this.props.onClick} />
        )
    }
}

const desiredSize = new Size(1024, 1024)
const areaPadding = {landscape: new Size(200, 0), portrait: new Size(0, 200)}

interface GameAreaProps {
    items: Game.SelectedItems,
    onRemove: (category: Category, item: Item) => void
    onMoveItem: (category: Category, item: Item, x: number, y: number) => void
}
interface GameState {
    windowSize: Size,
    scale: number
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
        const windowSize = new Size(window.innerWidth, window.innerHeight)
            .minus(areaPadding[isLandscape ? 'landscape' : 'portrait'])
        const scale = GameArea.getAreaScale(windowSize)
        this.setState({ windowSize: windowSize, scale: scale })
    }

    render() {
        return (
            <div className="Game">
                <div className="Content"
                     style={{ transform: `scale(${this.state.scale})`}}>
                   {this.categories.map(category => (Object.keys(this.props.items[category.type] || {})).map(fn => {
                       const item = this.props.items[category.type][fn]
                       return item ?
                           <ItemElement key={item.fileName} item={item} category={category} scale={this.state.scale}
                                        onClick={() => {this.props.onRemove(category, item)}}
                                        onMove={(x, y) => this.props.onMoveItem(category, item, x, y)}/> :
                           undefined
                   })).filter(i => i !== undefined)}
                   <br />
                </div>
            </div>
        )
    }
}

const StatefulGameArea = connect(
    (state: Game.State) => ({ items: state.selectedItems }),
    (dispatch) => ({
        onRemove: (category: Category, item: Item) => { dispatch(toggleItem(item, category)) },
        onMoveItem: (category: Category, item: Item, x: number, y: number) => {
            dispatch(moveItem(item, category, x, y))
        }
    })
)(GameArea)

export default StatefulGameArea
