import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { CategoryItems, removeItem, State, toggleItem } from './GameState';
import categories, { Category, Item } from './Items';
import ItemView from './ItemView';

type ItemListProps = {
  restricted: boolean;
  selectedItems: CategoryItems;
  category: Category | undefined;
  onSelectItem: (category: Category, item: Item, restricted: boolean) => void;
  onRemoveItem: (category: Category) => void;
};

const ItemListView: React.FC<ItemListProps> = ({
  restricted,
  selectedItems,
  category: cat,
  onSelectItem,
  onRemoveItem,
}) => {
  const selectItem = (item?: Item) => {
    if (cat) {
      if (item) {
        onSelectItem(cat, item, restricted);
      } else {
        onRemoveItem(cat);
      }
    }
  };

  return cat ? (
    <ListContainer>
      <ItemView category={cat} onClick={selectItem} />
      {cat.items.map(i => (
        <ItemView
          key={i.fileName}
          selected={selectedItems && selectedItems[i.fileName] !== undefined}
          category={cat}
          item={i}
          onClick={selectItem}
        />
      ))}
    </ListContainer>
  ) : null;
};

export const ItemList = connect(
  (state: State) => {
    const category = state.selectedCategory
      ? categories.find(c => c.type === state.selectedCategory)
      : undefined;
    return {
      category: category,
      restricted: state.settings.restrictions,
      selectedItems: category ? state.selectedItems[category.type] : {},
    };
  },
  dispatch => ({
    onSelectItem: (category: Category, item: Item, restricted: boolean) => {
      dispatch(toggleItem(item, category, restricted));
    },
    onRemoveItem: (category: Category) => {
      dispatch(removeItem(category));
    },
  })
)(ItemListView);

const ListContainer = styled.div`
  margin: 0 0.3em;
  display: inline-block;

  @media all and (orientation: portrait) {
    margin: 0.3em 0;
  }
`;
