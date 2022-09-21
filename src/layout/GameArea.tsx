import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { moveItem, SelectedItems, State, toggleItem } from '../game/GameState';
import allItems, { Category, Item } from '../game/Items';
import { Size } from '../util/size';
import { ItemElement } from './ItemElement';

const desiredSize = new Size(1024, 1024);
const areaPadding = { landscape: new Size(200, 0), portrait: new Size(0, 200) };

interface GameAreaProps {
  items: SelectedItems;
  onRemove: (category: Category, item: Item) => void;
  onMoveItem: (category: Category, item: Item, x: number, y: number) => void;
  restricted: boolean;
}
interface GameState {
  windowSize: Size;
  scale: number;
}

export class GameArea extends React.Component<GameAreaProps, GameState> {
  categories: Category[];

  static getAreaScale(w: Size): number {
    if (w.width >= desiredSize.width && w.height >= desiredSize.height) {
      return 1;
    }
    let scale = 1;
    if (w.width < desiredSize.width) {
      scale = Math.min(scale, w.width / desiredSize.width);
    }
    if (w.height < desiredSize.height) {
      scale = Math.min(scale, w.height / desiredSize.height);
    }
    return scale;
  }

  constructor(props: GameAreaProps) {
    super(props);
    this.categories = allItems;
  }

  UNSAFE_componentWillMount() {
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.setState({ windowSize: desiredSize });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const isLandscape = window.innerWidth >= window.innerHeight;
    const windowSize = new Size(window.innerWidth, window.innerHeight).minus(
      areaPadding[isLandscape ? 'landscape' : 'portrait']
    );
    const scale = GameArea.getAreaScale(windowSize);
    this.setState({ windowSize: windowSize, scale: scale });
  }

  render() {
    return (
      <Container>
        <Content scale={this.state.scale}>
          {this.categories
            .map(category =>
              Object.keys(this.props.items[category.type] || {}).map(fn => {
                const item = this.props.items[category.type][fn];
                return item ? (
                  <ItemElement
                    key={item.fileName}
                    item={item}
                    category={category}
                    scale={this.state.scale}
                    onClick={() => {
                      this.props.onRemove(category, item);
                    }}
                    restricted={this.props.restricted}
                  />
                ) : undefined;
              })
            )
            .filter(i => i !== undefined)}
          <br />
        </Content>
      </Container>
    );
  }
}

const StatefulGameArea = connect(
  (state: State) => ({
    items: state.selectedItems,
    restricted: state.settings.restrictions,
  }),
  dispatch => ({
    onRemove: (category: Category, item: Item) => {
      dispatch(toggleItem(item, category, false));
    },
    onMoveItem: (category: Category, item: Item, x: number, y: number) => {
      dispatch(moveItem(item, category, x, y));
    },
  })
)(GameArea);

export default StatefulGameArea;

const Container = styled.div`
  padding: 0;
`;

type ContentProps = { scale: number };
const Content = styled.div`
  width: 1024px;
  height: 1024px;
  display: block;
  transform-origin: top left;

  transform: scale(${({ scale }: ContentProps) => scale});
`;
