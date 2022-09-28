import { uri } from 'shared/net/urlUtils';
import { baseUrl } from 'client/common';

export function getImagePath(path: string) {
  return `${baseUrl}/images/${path}`;
}

export function getItemImagePath(fileName: string | undefined) {
  return fileName ? getImagePath(uri`items/${fileName}`) : undefined;
}
