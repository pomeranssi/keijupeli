import { Category, CategoryType } from 'shared/types';

export const BaseCategoryData: Record<
  CategoryType,
  Omit<Category, 'items' | 'type'>
> = {
  background: {
    title: 'Taustat',
    isBackground: true,
    imageFileName: 'images/category/category-background.png',
    isEssential: false,
    isUnique: true,
    isMovable: false,
  },
  body: {
    title: 'Vartalot',
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-body.png',
  },
  crown: {
    title: 'Päähineet',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: 'images/category/category-crown.png',
  },
  hair: {
    title: 'Hiukset',
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-hair.png',
  },
  eyes: {
    title: 'Silmät',
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: true,
    imageFileName: 'images/category/category-eyes.png',
  },
  necklace: {
    title: 'Kaulakorut',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: 'images/category/category-necklace.png',
  },
  wings: {
    title: 'Siivet',
    isBackground: false,
    isEssential: false,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-wings.png',
  },
  chest: {
    title: 'Paidat',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: 'images/category/category-chest.png',
  },
  legs: {
    title: 'Housut',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: 'images/category/category-legs.png',
  },
  shoes: {
    title: 'Jalkineet',
    isBackground: false,
    isEssential: false,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-shoes.png',
  },
  other: {
    title: 'Asusteet',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: 'images/category/category-other.png',
  },
  pets: {
    title: 'Lemmikit',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: 'images/category/category-pets.png',
  },
};
