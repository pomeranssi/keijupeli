import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { CategoryType, Session } from 'shared/types';
import { getImagePath } from 'client/layout/Images';
import { ItemImageView } from 'client/layout/ItemImageView';

import { apiClient } from './apiCient';
import { useGameState } from './GameState';

export const UploadImageButton: React.FC = ({}) => {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const [category, session] = useGameState(
    s => [s.selectedCategory, s.session] as const,
    shallow
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
  await sendImageData(session.id, formData);
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
