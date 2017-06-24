import * as React from 'react'
import categories, {Category} from './Items'
import ItemSelector from './ItemSelector'
import {connect} from 'react-redux'
import './CategoryList.css'
import {Game, selectCategory} from './GameState'

export class CategoryList extends React.Component<{
    selectedCategory: Game.SelectedCategory,
    selectedItems: Game.SelectedItems,
    onSelectCategory: (category: Category) => void
}, {}> {
    render() {
        return (
            <div className="CategoryList">
                {categories.map(c => <ItemSelector category={c} key={c.title}
                                              selectedItem={this.props.selectedItems[c.type]}
                                              setCategory={this.props.onSelectCategory}/>)}
            </div>
        )
    }
}

const StatefulCategoryList = connect(
    (state: Game.State) => ({ selectedCategory: state.selectedCategory, selectedItems: state.selectedItems }),
    (dispatch) => ({onSelectCategory: (category: Category) => { dispatch(selectCategory(category)) } })
)(CategoryList)

export default StatefulCategoryList
