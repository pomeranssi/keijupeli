import * as React from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { CategoryType, Session } from 'shared/types';
import { apiClient } from 'client/game/apiCient';
import { initializeCategories } from 'client/game/dataInit';
import { useGameState } from 'client/game/state';
import { ItemImageView } from 'client/ui/common/ItemImageView';
import { getImagePath } from 'client/ui/images';
import { executeOperation } from 'client/util/executeOperation';

export const UploadImageButton: React.FC = () => {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const [category, session] = useGameState(
    useShallow(s => [s.selectedCategory, s.session] as const)
  );

  const selectFile = async (e: any) => {
    e.preventDefault();
    if (!session) return;
    const files = e.dataTransfer?.files ?? e.target?.files;
    if (!files || !files[0]) return;
    await uploadImage(session, category, files[0], files[0].name);
    const input = ref.current;
    if (input) {
      input.value = '';
    }
  };

  return (
    <>
      <label htmlFor="upload-file">
        <ItemImageView image={getImagePath('icon-add.png')} />
      </label>
      <FileInput type="file" id="upload-file" onChange={selectFile} ref={ref} />
    </>
  );
};

async function uploadImage(
  session: Session,
  category: CategoryType,
  file: any,
  filename: string
) {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('image', file, filename);
  await executeOperation(sendImageData(session.id, formData), {
    success: 'Kuva lisätty!',
    postProcess: () => initializeCategories(),
  });
}

const sendImageData = (sessionId: string, formData: FormData) =>
  apiClient.post('/upload', {
    body: formData,
    contentType: null,
    sessionId,
  });

const FileInput = styled.input`
  display: none;
`;
