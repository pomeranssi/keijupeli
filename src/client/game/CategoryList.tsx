import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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

interface CategoreyListProps {
  selectedCategory: SelectedCategory;
  selectedItems: SelectedItems;
  onSelectCategory: (category: Category) => void;
}

const CategoryListView: React.FC<CategoreyListProps> = ({
  selectedCategory,
  selectedItems,
  onSelectCategory,
}) => (
  <Container>
    {categories.map(c => (
      <CategoryItem
        className={
          (selectedItems[c.type] ? 'has-item' : 'missing') +
          (selectedCategory === c.type ? ' selected' : '')
        }
        key={c.type}
      >
        <ItemView
          category={c}
          item={findItem(selectedItems[c.type])}
          missingImage={c.imageFileName}
          onClick={() => onSelectCategory(c)}
        >
          <CategoryTitle className="category-title">{c.title}</CategoryTitle>
        </ItemView>
      </CategoryItem>
    ))}
  </Container>
);

export const CategoryList = connect(
  (state: State) => ({
    selectedCategory: state.selectedCategory,
    selectedItems: state.selectedItems,
  }),
  dispatch => ({
    onSelectCategory: (category: Category) => {
      dispatch(selectCategory(category));
    },
  })
)(CategoryListView);

const CategoryItem = styled.div`
  position: relative;
  text-align: center;

  &.missing > .ItemView {
    background: rgba(255, 255, 255, 0.2);
  }
  &.missing > .ItemView > .ItemImage {
    opacity: 0.5;
  }
  &.missing > .ItemView > .ItemImage.background {
    opacity: 0.3;
  }

  &.selected .category-title {
    background: rgba(255, 153, 153, 0.7);
  }

  @media all and (orientation: portrait) {
    display: inline-block;
  }
`;

const CategoryTitle = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  font-size: 9pt;
  z-index: 2;

  transform-origin: left top;
  transform: translate(0, 90px) rotate(-90deg);
  background: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  margin: 0 0.3em;
  display: inline-block;

  @media all and (orientation: portrait) {
    margin: 0.3em 0;
  }
`;
