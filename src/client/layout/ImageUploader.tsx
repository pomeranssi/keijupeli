import 'cropperjs/dist/cropper.css';

import * as React from 'react';
import Cropper from 'react-cropper';

export const ImageUploader: React.FC = () => {
  return (
    <Cropper
      src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
      // Cropper.js options
      guides={true}
      style={{ height: '100%', width: '100%' }}
      zoomTo={0.5}
      initialAspectRatio={1}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={false}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
    />
  );
};
