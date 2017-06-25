import * as React from 'react'
import categories, {Category} from './Items'
import {connect} from 'react-redux'
import {Game, selectCategory} from './GameState'
import ItemView from './ItemView'
import './CategoryList.css'

export class CategoryList extends React.Component<{
    selectedCategory: Game.SelectedCategory,
    selectedItems: Game.SelectedItems,
    onSelectCategory: (category: Category) => void
}, {}> {
    render() {
        return (
            <div className="CategoryList">
                {categories.map(c => <div className="CategoryItem" key={c.type}>
                    <ItemView
                        category={c}
                        item={this.props.selectedItems[c.type]}
                        missingImage={c.thumb}
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
