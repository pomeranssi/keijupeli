import * as React from 'react'
import categories, {Category, Item} from './Items'
import {connect} from 'react-redux'
import {Game, selectCategory} from './GameState'
import ItemView from './ItemView'
import './CategoryList.css'

function findItem(selection: Game.CategoryItems): Item | undefined {
    const fn = Object.keys(selection || {}).find(i => true)
    return fn ? selection[fn] : undefined
}

export class CategoryList extends React.Component<{
    selectedCategory: Game.SelectedCategory,
    selectedItems: Game.SelectedItems,
    onSelectCategory: (category: Category) => void
}, {}> {
    render() {
        return (
            <div className="CategoryList">
                {categories.map(c => <div className={'CategoryItem ' +
                    (this.props.selectedItems[c.type] ? 'has-item' : 'missing') +
                    (this.props.selectedCategory === c.type ? ' selected' : '')} key={c.type}>
                    <ItemView
                        category={c}
                        item={findItem(this.props.selectedItems[c.type])}
                        missingImage={c.imageFileName}
                        onClick={() => this.props.onSelectCategory(c)}>
                        <div className="CategoryTitle">{c.title}</div>
                    </ItemView>
                </div>
                )}
            </div>
        )
    }
}

const StatefulCategoryList = connect(
    (state: Game.State) => ({ selectedCategory: state.selectedCategory, selectedItems: state.selectedItems }),
    (dispatch) => ({onSelectCategory: (category: Category) => { dispatch(selectCategory(category)) } })
)(CategoryList)

export default StatefulCategoryList
