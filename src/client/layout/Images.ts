import { baseUrl } from 'client/common';

export function getImagePath(path: string) {
  return `${baseUrl}/images/${path}`;
}
