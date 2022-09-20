export interface Category {
  readonly title: string;
  readonly type: string;
  readonly isBackground: boolean;
  readonly isEssential: boolean;
  readonly isUnique: boolean;
  readonly isMovable: boolean;
  readonly imageFileName: string;
  readonly items: Array<Item>;
}

export interface Item {
  readonly fileName: string;
  readonly left: number;
  readonly top: number;
  readonly isDefault?: boolean;
  readonly zIndex?: number;
}

const baseUrl = process.env.PUBLIC_URL;

export function getImagePath(fileName: string | undefined) {
  return fileName ? `${baseUrl}/images/${fileName}` : undefined;
}

export function getThumbPath(fileName: string | undefined) {
  return fileName ? `${baseUrl}/images/thumbs/${fileName}` : undefined;
}

const categories: Category[] = [
  {
    title: "Taustat",
    type: "background",
    isBackground: true,
    imageFileName: "category-background.jpg",
    isEssential: false,
    isUnique: true,
    isMovable: false,
    items: [
      { fileName: "bg-castle.jpg", left: 0, top: 0 },
      { fileName: "bg-beach.jpg", left: 0, top: 0, isDefault: true },
      { fileName: "bg-snow.jpg", left: 0, top: 0 },
      { fileName: "bg-castle-carrots.jpg", left: 0, top: 0 },
      { fileName: "bg-ocean.jpg", left: 0, top: 0 },
      { fileName: "bg-farm.jpg", left: 0, top: 0 },
      { fileName: "bg-houses.jpg", left: 0, top: 0 },
      { fileName: "bg-oldhouse.jpg", left: 0, top: 0 },
      { fileName: "bg-town.jpg", left: 0, top: 0 },
      { fileName: "bg-meadow.jpg", left: 0, top: 0 },
    ],
  },
  {
    title: "Vartalot",
    type: "body",
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: false,
    imageFileName: "category-body.png",
    items: [
      { fileName: "girl-white.png", left: 336, top: 198, isDefault: true },
      { fileName: "girl-latino.png", left: 336, top: 198 },
    ],
  },
  {
    title: "Hatut",
    type: "crown",
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: "category-crown.png",
    items: [
      { fileName: "tiara-yellow.png", left: 383, top: 201 },
      { fileName: "crown-yellow.png", left: 377, top: 124 },
      { fileName: "crown-hearts.png", left: 381, top: 98 },
      { fileName: "hat-colorful.png", left: 266, top: 140 },
    ],
  },
  {
    title: "Hiukset",
    type: "hair",
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: false,
    imageFileName: "category-hair.png",
    items: [
      { fileName: "hair-orig.png", left: 335, top: 150, isDefault: true },
      { fileName: "hair-yellow.png", left: 329, top: 148 },
      { fileName: "hair-elsa.png", left: 369, top: 166 },
      { fileName: "hair-brown.png", left: 366, top: 188 },
      { fileName: "hair-pink-short.png", left: 373, top: 191 },
      { fileName: "hair-pink-long.png", left: 247, top: 171, zIndex: 45 },
      { fileName: "hair-red.png", left: 327, top: 159 },
      { fileName: "hair-blue.png", left: 331, top: 101 },
      { fileName: "hair-black.png", left: 352, top: 169 },
    ],
  },
  {
    title: "Silmät",
    type: "eyes",
    isBackground: false,
    isEssential: true,
    isUnique: true,
    isMovable: true,
    imageFileName: "category-eyes.png",
    items: [
      { fileName: "eyes-blue.png", left: 419, top: 310, isDefault: true },
      { fileName: "eyes-green.png", left: 419, top: 310 },
      { fileName: "eyes-brightgreen.png", left: 419, top: 310 },
      { fileName: "eyes-brown.png", left: 419, top: 310 },
      { fileName: "eyes-pink.png", left: 419, top: 310 },
      { fileName: "eyes-yellow.png", left: 419, top: 310 },
      { fileName: "eyes-red.png", left: 419, top: 310 },
      { fileName: "eyes-purple.png", left: 419, top: 310 },
      { fileName: "eyes-orange.png", left: 419, top: 310 },
    ],
  },
  {
    title: "Kaulakorut",
    type: "necklace",
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: "category-necklace.png",
    items: [
      { fileName: "necklace-white.png", left: 469, top: 412 },
      { fileName: "necklace-white2.png", left: 469, top: 412 },
      { fileName: "necklace-yellow.png", left: 462, top: 413 },
      { fileName: "necklace-colorful.png", left: 458, top: 401 },
      { fileName: "necklace-blue.png", left: 466, top: 411 },
      { fileName: "necklace-many-black.png", left: 454, top: 411 },
      { fileName: "necklace-stone.png", left: 466, top: 415 },
      { fileName: "necklace-heart.png", left: 467, top: 414 },
      { fileName: "necklace-pink.png", left: 469, top: 410 },
    ],
  },
  {
    title: "Siivet",
    type: "wings",
    isBackground: false,
    isEssential: false,
    isUnique: true,
    isMovable: false,
    imageFileName: "category-wings.png",
    items: [
      { fileName: "wings-pink.png", left: 25, top: 29 },
      { fileName: "wings-pink2.png", left: 50, top: 140 },
      { fileName: "wings-pink3.png", left: 50, top: 140 },
      { fileName: "wings-red.png", left: 107, top: 107 },
      { fileName: "wings-bw.png", left: 244, top: 249 },
      { fileName: "wings-bluered.png", left: 37, top: 23 },
    ],
  },
  {
    title: "Paidat",
    type: "chest",
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: "category-chest.png",
    items: [
      { fileName: "dress-blue.png", left: 439, top: 406 },
      { fileName: "dress-redblue.png", left: 353, top: 326 },
      { fileName: "dress-yellow.png", left: 247, top: 412 },
      { fileName: "dress-yellow2.png", left: 287, top: 411 },
      { fileName: "dress-yellow-white.png", left: 223, top: 345 },
      { fileName: "dress-heart.png", left: 387, top: 413 },
      { fileName: "dress-elsa.png", left: 287, top: 422 },
      { fileName: "dress-dots.png", left: 348, top: 401 },
      { fileName: "dress-dotty.png", left: 352, top: 417 },
      { fileName: "dress-dotty2.png", left: 232, top: 412 },
      { fileName: "dress-drawn.png", left: 243, top: 400 },
      { fileName: "dress-drawn2.png", left: 276, top: 404 },
      { fileName: "dress-lilac-yellow.png", left: 278, top: 416 },
      { fileName: "dress-long-side.png", left: 317, top: 415 },
      { fileName: "dress-rapunzel.png", left: 336, top: 416 },
      { fileName: "dress-stylish.png", left: 300, top: 414 },
      { fileName: "dress-black.png", left: 412, top: 419 },
      { fileName: "jacket-black.png", left: 374, top: 401 },
      { fileName: "shirt-white.png", left: 417, top: 403 },
      { fileName: "shirt-lilac.png", left: 402, top: 400 },
      { fileName: "mermaid-bra.png", left: 443, top: 448 },
      { fileName: "bikini-bra-yellow.png", left: 450, top: 450 },
      { fileName: "chest-swimsuit.png", left: 386, top: 413 },
      { fileName: "swimsuit-yellow.png", left: 425, top: 415 },
    ],
  },
  {
    title: "Housut",
    type: "leg",
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: false,
    imageFileName: "category-leg.png",
    items: [
      { fileName: "skirt-red.png", left: 421, top: 529 },
      { fileName: "skirt-pink.png", left: 397, top: 534 },
      { fileName: "skirt-orange.png", left: 322, top: 530 },
      { fileName: "bikini-pants-yellowred.png", left: 428, top: 548 },
      { fileName: "jeans-blue.png", left: 370, top: 545 },
      { fileName: "mermaid-tail.png", left: 290, top: 529 },
      { fileName: "pants-colorful.png", left: 371, top: 541 },
      { fileName: "pants-red.png", left: 366, top: 543 },
    ],
  },
  {
    title: "Kengät",
    type: "shoes",
    isBackground: false,
    isEssential: false,
    isUnique: true,
    isMovable: false,
    imageFileName: "category-shoes.png",
    items: [
      { fileName: "shoes-blue.png", left: 373, top: 888, isDefault: true },
      { fileName: "shoes-yellow.png", left: 369, top: 872 },
      { fileName: "shoes-yellow2.png", left: 371, top: 872 },
      { fileName: "shoes-black.png", left: 372, top: 904 },
      { fileName: "shoes-colorful.png", left: 369, top: 891 },
      { fileName: "shoes-whiteblack.png", left: 372, top: 732 },
      { fileName: "shoes-redyellow.png", left: 371, top: 894 },
      { fileName: "shoes-pink.png", left: 371, top: 883 },
      { fileName: "shoes-brown.png", left: 372, top: 888 },
    ],
  },
  {
    title: "Asusteet",
    type: "other",
    isBackground: false,
    isEssential: false,
    isUnique: false,
    isMovable: true,
    imageFileName: "category-other.png",
    items: [
      { fileName: "gloves-yellow.png", left: 331, top: 577 },
      { fileName: "shovel.png", left: 491, top: 586 },
    ],
  },
];

export default categories;
