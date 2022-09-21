import './CategoryList.css';

import * as React from 'react';
import { connect } from 'react-redux';

import {
  CategoryItems,
  selectCategory,
  SelectedCategory,
  SelectedItems,
  State,
} from './GameState';
import categories, { Category, Item } from './Items';
import { ItemView } from './ItemView';

function findItem(selection: CategoryItems): Item | undefined {
  const fn = Object.keys(selection || {}).find(() => true);
  return fn ? selection[fn] : undefined;
}

export class CategoryList extends React.Component<{
  selectedCategory: SelectedCategory;
  selectedItems: SelectedItems;
  onSelectCategory: (category: Category) => void;
}> {
  render() {
    return (
      <div className="CategoryList">
        {categories.map(c => (
          <div
            className={
              'CategoryItem ' +
              (this.props.selectedItems[c.type] ? 'has-item' : 'missing') +
              (this.props.selectedCategory === c.type ? ' selected' : '')
            }
            key={c.type}
          >
            <ItemView
              category={c}
              item={findItem(this.props.selectedItems[c.type])}
              missingImage={c.imageFileName}
              onClick={() => this.props.onSelectCategory(c)}
            >
              <div className="CategoryTitle">{c.title}</div>
            </ItemView>
          </div>
        ))}
      </div>
    );
  }
}

const StatefulCategoryList = connect(
  (state: State) => ({
    selectedCategory: state.selectedCategory,
    selectedItems: state.selectedItems,
  }),
  dispatch => ({
    onSelectCategory: (category: Category) => {
      dispatch(selectCategory(category));
    },
  })
)(CategoryList);

export default StatefulCategoryList;
