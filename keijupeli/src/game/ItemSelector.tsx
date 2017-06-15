import * as React from 'react'
import items from './items'
import './ItemSelector.css'

export default class ItemSelector extends React.Component<{}, null> {
    render() {
        return (
            <div className="Items">
                {items.map(i => <div>{i.title}</div>)}
            </div>
        )
    }
}
