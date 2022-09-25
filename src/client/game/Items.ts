import { uri } from 'shared/net/UrlUtils';
import { getImagePath } from 'client/layout/Images';

export function getItemImagePath(fileName: string | undefined) {
  return fileName ? getImagePath(uri`items/${fileName}`) : undefined;
}

export function getItemThumbPath(fileName: string | undefined) {
  return fileName ? getImagePath(uri`thumbs/${fileName}`) : undefined;
}
