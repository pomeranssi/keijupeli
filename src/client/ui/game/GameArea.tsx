import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { TargetImageSize } from 'shared/types/images';
import { useGameState } from 'client/game/state';
import { useWindowSize } from 'client/hooks/useWindowSize';
import { Size } from 'client/util/size';

import { ItemElement } from '../common/ItemElement';

const desiredSize = new Size(TargetImageSize, TargetImageSize);

const areaPadding = { landscape: new Size(200, 0), portrait: new Size(0, 200) };

export const GameArea: React.FC = ({}) => {
  const window = useWindowSize();

  const isLandscape = window.width >= window.height;
  const availableSpace = window.minus(
    areaPadding[isLandscape ? 'landscape' : 'portrait']
  );
  const scale = availableSpace.getScale(desiredSize);

  return (
    <Container>
      <DollImages scale={scale} />
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
          Object.keys(selectedItems[category.type] ?? {}).map(fn => {
            const item = selectedItems[category.type]?.[fn];
            return item ? (
              <>
                <ItemElement
                  key={item.id}
                  item={item}
                  category={category}
                  scale={scale}
                  onClick={() => toggleItem(category.type, item)}
                  restricted={restricted}
                />
                {item.linked?.map(l => (
                  <ItemElement
                    key={l.id}
                    item={l}
                    category={category}
                    scale={scale}
                    onClick={() => toggleItem(category.type, item)}
                    restricted={restricted}
                  />
                )) ?? null}
              </>
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
  width: ${TargetImageSize}px;
  height: ${TargetImageSize}px;
  display: block;
  transform-origin: top left;

  transform: scale(${({ scale }: ContentProps) => scale});
`;
