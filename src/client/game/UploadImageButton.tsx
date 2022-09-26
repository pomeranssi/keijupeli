import * as React from 'react';
import styled from 'styled-components';

import { CategoryType } from 'shared/types';
import { getImagePath } from 'client/layout/Images';
import { ItemImageView } from 'client/layout/ItemImageView';

import { apiClient } from './apiCient';
import { useGameState } from './GameState';

export const UploadImageButton: React.FC = ({}) => {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const category = useGameState(s => s.selectedCategory);

  const selectFile = async (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer?.files ?? e.target?.files;
    if (!files || !files[0]) return;
    await uploadImage(category, files[0], files[0].name);
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
  category: CategoryType,
  file: any,
  filename: string
) {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('image', file, filename);
  await sendImageData(formData);
}

const sendImageData = (formData: FormData) =>
  apiClient.post('/upload', {
    body: formData,
    contentType: null,
  });

const FileInput = styled.input`
  display: none;
`;
