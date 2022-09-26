import 'cropperjs/dist/cropper.css';

import * as React from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import styled, { css } from 'styled-components';

import { ContentTypes } from 'shared/net/ContentTypes';
import { CategoryType } from 'shared/types';
import { TargetImageSize } from 'shared/types/images';
import { apiClient } from 'client/game/apiCient';
import { useGameState } from 'client/game/GameState';

export const ImageUploader: React.FC = () => {
  const category = useGameState(s => s.selectedCategory);
  const cropperRef = React.useRef<ReactCropperElement>(null);
  const [file, setFile] = React.useState<any>(undefined);
  const [filename, setFilename] = React.useState('');

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (!cropper) return;
    return uploadImage(
      category,
      filename,
      cropper.getCropBoxData(),
      cropper.getCroppedCanvas()
    );
  };

  React.useEffect(() => {
    cropperRef.current?.cropper?.reset();
  }, [file]);

  const selectFile = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer?.files ?? e.target?.files;
    if (!files) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    };
    setFilename(files[0].name);
    reader.readAsDataURL(files[0]);
  };

  return (
    <Container>
      <Cropper
        ref={cropperRef}
        guides={true}
        src={file}
        style={{ height: TargetImageSize, width: TargetImageSize }}
        zoomTo={0.5}
        initialAspectRatio={1}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={true}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
      />
      <Tools>
        <FileLabel htmlFor="file-upload" className="custom-file-upload">
          Valitse
        </FileLabel>
        <FileInput id="file-upload" type="file" onChange={selectFile} />
        <Button onClick={onCrop}>Leikkaa</Button>
      </Tools>
    </Container>
  );
};

function uploadImage(
  category: CategoryType,
  filename: string,
  info: Cropper.CropBoxData,
  image: HTMLCanvasElement
) {
  image.toBlob(async blob => {
    if (!blob) return;
    const formData = new FormData();
    formData.append('image', blob, filename);
    formData.append('category', category);
    formData.append('left', String(info.left));
    formData.append('top', String(info.top));
    formData.append('width', String(info.width));
    formData.append('height', String(info.height));

    await sendImageData(formData);
  }, ContentTypes.png);
}

const sendImageData = (formData: FormData) =>
  apiClient.post('/upload', {
    body: formData,
    contentType: null,
  });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  padding: 32px;
`;

const Tools = styled.div`
  margin-top: 16px;
`;

const BaseButtonStyle = css`
  font-size: 14px;
  padding: 0 16px;
  background-color: #91bdc0;
  border: none;
  border-radius: 16px;
  height: 32px;

  &:active {
    background-color: teal;
  }

  margin: 0 8px;
`;

const Button = styled.button`
  ${BaseButtonStyle}
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  ${BaseButtonStyle}
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
