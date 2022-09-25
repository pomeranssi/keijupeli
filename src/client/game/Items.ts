const baseUrl = process.env.PUBLIC_URL;

export function getImagePath(fileName: string | undefined) {
  return fileName ? `${baseUrl}/images/items/${fileName}` : undefined;
}

export function getThumbPath(fileName: string | undefined) {
  return fileName ? `${baseUrl}/images/thumbs/${fileName}` : undefined;
}
