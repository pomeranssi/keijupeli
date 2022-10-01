import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { Item } from 'shared/types';
import { CategoryItems, useGameState } from 'client/game/state';

import { colors } from '../colors';
import { ItemView } from '../common/ItemView';

function findItem(selection: CategoryItems): Item | undefined {
  const fn = Object.keys(selection || {}).find(() => true);
  return fn ? selection[fn] : undefined;
}

export const CategoryList: React.FC = () => {
  const [selectedCategory, categories, selectedItems, selectCategory] =
    useGameState(
      s => [
        s.selectedCategory,
        s.categories,
        s.selectedItems,
        s.selectCategory,
      ],
      shallow
    );
  return (
    <Container>
      {Object.values(categories).map(category => (
        <CategoryItem
          className={
            (Object.keys(selectedItems[category.type] ?? {}).length > 0
              ? 'has-item'
              : 'missing') +
            (selectedCategory === category.type ? ' selected' : '')
          }
          key={category.type}
        >
          <ItemView
            category={category}
            item={findItem(selectedItems[category.type])}
            missingImage={category.imageFileName}
            onClick={() => selectCategory(category.type)}
          >
            <CategoryTitle className="category-title">
              {category.title}
            </CategoryTitle>
          </ItemView>
        </CategoryItem>
      ))}
    </Container>
  );
};

const CategoryItem = styled.div`
  position: relative;
  text-align: center;

  &.missing > .ItemView {
    background: rgba(255, 255, 255, 0.2);
  }
  &.missing > .ItemView > .ItemImage {
    opacity: 0.8;
    filter: grayscale(0.9);
  }
  &.missing > .ItemView > .ItemImage.background {
    opacity: 0.3;
  }

  &.selected .category-title {
    background: ${colors.primary[200]}aa;
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
