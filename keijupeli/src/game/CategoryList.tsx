import * as React from 'react'
import './CategoryList.css'
import items from './Items'
import ItemSelector from './ItemSelector'
import {GameControl} from './GameControl'

export default class CategoryList extends React.Component<{
    getGameControl: () => GameControl
}, null> {
    render() {
        return (
            <div className="CategoryList">
                {items.map(i => <ItemSelector category={i} key={i.title} getGameControl={this.props.getGameControl}/>)}
            </div>
        )
    }
}
