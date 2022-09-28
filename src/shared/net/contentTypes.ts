export const ContentTypes = {
  json: 'application/json',
  formData: 'multipart/form-data',
  formEncoded: 'application/x-www-form-urlencoded',
  png: 'image/png',
} as const;

export function getPlainContentType(contentType?: string) {
  const [ct] = (contentType ?? '').split(';');
  return ct.trim();
}

export function isJsonContent(contenType?: string) {
  return getPlainContentType(contenType).toLowerCase() === 'application/json';
}
