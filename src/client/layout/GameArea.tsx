import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { useGameState } from 'client/game/GameState';

import { useWindowSize } from '../hooks/useWindowSize';
import { Size } from '../util/size';
import { ImageUploader } from './ImageUploader';
import { ItemElement } from './ItemElement';

const desiredSize = new Size(1024, 1024);

const areaPadding = { landscape: new Size(200, 0), portrait: new Size(0, 200) };

export const GameArea: React.FC = ({}) => {
  const window = useWindowSize();

  const isLandscape = window.width >= window.height;
  const availableSpace = window.minus(
    areaPadding[isLandscape ? 'landscape' : 'portrait']
  );
  const scale = availableSpace.getScale(desiredSize);

  const uploading = useGameState(s => s.uploading);

  return (
    <Container>
      {uploading ? <ImageUploader /> : <DollImages scale={scale} />}
    </Container>
  );
};

const DollImages: React.FC<{ scale: number }> = ({ scale }) => {
  const [categories, selectedItems, restricted, toggleItem] = useGameState(
    s => [s.categories, s.selectedItems, s.restricted, s.toggleItem],
    shallow
  );

  return (
    <Content scale={scale}>
      {Object.values(categories)
        .map(category =>
          Object.keys(selectedItems[category.type]).map(fn => {
            const item = selectedItems[category.type][fn];
            return item ? (
              <ItemElement
                key={item.filename}
                item={item}
                category={category}
                scale={scale}
                onClick={() => toggleItem(category.type, item)}
                restricted={restricted}
              />
            ) : undefined;
          })
        )
        .filter(i => i !== undefined)}
      <br />
    </Content>
  );
};

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
