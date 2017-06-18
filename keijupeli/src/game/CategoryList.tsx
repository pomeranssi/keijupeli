import * as React from 'react'
import items from './items'
import './CategoryList.css'
import ItemSelector from './ItemSelector'

export default class CategoryList extends React.Component<{}, null> {
    render() {
        return (
            <div className="CategoryList">
                {items.map(i => <ItemSelector category={i} key={i.title}/>)}
            </div>
        )
    }
}
