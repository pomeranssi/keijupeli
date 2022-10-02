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
    zIndex: 0,
  },
  body: {
    title: 'Vartalot',
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-body.png',
    zIndex: 2,
  },
  crown: {
    title: 'Päähineet',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: 'images/category/category-crown.png',
    zIndex: 50,
  },
  hair: {
    title: 'Hiukset',
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-hair.png',
    zIndex: 30,
  },
  eyes: {
    title: 'Silmät',
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: true,
    imageFileName: 'images/category/category-eyes.png',
    zIndex: 20,
  },
  necklace: {
    title: 'Kaulakorut',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: 'images/category/category-necklace.png',
    zIndex: 8,
  },
  wings: {
    title: 'Siivet',
    isBackground: false,
    isEssential: false,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-wings.png',
    zIndex: 1,
  },
  chest: {
    title: 'Paidat',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: 'images/category/category-chest.png',
    zIndex: 6,
  },
  legs: {
    title: 'Housut',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: 'images/category/category-legs.png',
    zIndex: 4,
  },
  shoes: {
    title: 'Jalkineet',
    isBackground: false,
    isEssential: false,
    isUnique: true,
    isMovable: false,
    imageFileName: 'images/category/category-shoes.png',
    zIndex: 3,
  },
  other: {
    title: 'Asusteet',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: 'images/category/category-other.png',
    zIndex: 60,
  },
  pets: {
    title: 'Lemmikit',
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: 'images/category/category-pets.png',
    zIndex: 70,
  },
};
