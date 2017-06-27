export interface Category {
    readonly title: string,
    readonly type: string,
    readonly isBackground?: boolean,
    readonly thumb: string,
    readonly isEssential: boolean,
    readonly items: Array<Item>
}

export interface Item {
    readonly img: string,
    readonly thumb: string,
    readonly left: number,
    readonly top: number
    readonly isDefault?: boolean,
    readonly zIndex?: number
}

const categories: Category[] = [
    {
        title: 'Taustat',
        type: 'background',
        isBackground: true,
        thumb: require('./thumbs/category-background.jpg'),
        isEssential: false,
        items: [
            { img: require('./images/bg-castle.jpg'), thumb: require('./thumbs/bg-castle.jpg'),
                left: 0, top: 0 },
            { img: require('./images/bg-beach.jpg'), thumb: require('./thumbs/bg-beach.jpg'),
                left: 0, top: 0, isDefault: true },
            { img: require('./images/bg-snow.jpg'), thumb: require('./thumbs/bg-snow.jpg'),
                left: 0, top: 0 },
            { img: require('./images/bg-castle-carrots.jpg'), thumb: require('./thumbs/bg-castle-carrots.jpg'),
                left: 0, top: 0 },
            { img: require('./images/bg-ocean.jpg'), thumb: require('./thumbs/bg-ocean.jpg'),
                left: 0, top: 0 }
        ]
    },
    {
        title: 'Vartalot',
        type: 'body',
        isEssential: true,
        thumb: require('./thumbs/category-body.png'),
        items: [
            { img: require('./images/girl-white.png'), thumb: require('./thumbs/girl-white.png'),
                left: 336, top: 198, isDefault: true },
            { img: require('./images/girl-latino.png'), thumb: require('./thumbs/girl-latino.png'),
                left: 336, top: 198 }
        ]
    },
    {
        title: 'Hatut',
        type: 'crown',
        isEssential: false,
        thumb: require('./thumbs/category-crown.png'),
        items: [
            { img: require('./images/tiara-yellow.png'), thumb: require('./thumbs/tiara-yellow.png'),
                left: 383, top: 201 },
            { img: require('./images/crown-yellow.png'), thumb: require('./thumbs/crown-yellow.png'),
                left: 377, top: 124 },
            { img: require('./images/crown-hearts.png'), thumb: require('./thumbs/crown-hearts.png'),
                left: 381, top: 98 },
            { img: require('./images/hat-colorful.png'), thumb: require('./thumbs/hat-colorful.png'),
                left: 266, top: 140 }
        ]
    },
    {
        title: 'Hiukset',
        type: 'hair',
        isEssential: false,
        thumb: require('./thumbs/category-hair.png'),
        items: [
            { img: require('./images/hair-orig.png'), thumb: require('./thumbs/hair-orig.png'),
                left: 335, top: 150, isDefault: true },
            { img: require('./images/hair-yellow.png'), thumb: require('./thumbs/hair-yellow.png'),
                left: 329, top: 148 },
            { img: require('./images/hair-elsa.png'), thumb: require('./thumbs/hair-elsa.png'),
                left: 369, top: 166 },
            { img: require('./images/hair-brown.png'), thumb: require('./thumbs/hair-brown.png'),
                left: 366, top: 188 },
            { img: require('./images/hair-pink-short.png'), thumb: require('./thumbs/hair-pink-short.png'),
                left: 373, top: 191 },
            { img: require('./images/hair-pink-long.png'), thumb: require('./thumbs/hair-pink-long.png'),
                left: 247, top: 171, zIndex: 45 },
            { img: require('./images/hair-black.png'), thumb: require('./thumbs/hair-black.png'),
                left: 352, top: 169 }
        ]
    },
    {
        title: 'Silmät',
        type: 'eyes',
        isEssential: true,
        thumb: require('./thumbs/category-eyes.png'),
        items: [
            { img: require('./images/eyes-blue.png'), thumb: require('./thumbs/eyes-blue.png'),
                left: 419, top: 310, isDefault: true },
            { img: require('./images/eyes-green.png'), thumb: require('./thumbs/eyes-green.png'),
                left: 419, top: 310 },
            { img: require('./images/eyes-brightgreen.png'), thumb: require('./thumbs/eyes-brightgreen.png'),
                left: 419, top: 310 },
            { img: require('./images/eyes-brown.png'), thumb: require('./thumbs/eyes-brown.png'),
                left: 419, top: 310 },
            { img: require('./images/eyes-pink.png'), thumb: require('./thumbs/eyes-pink.png'),
                left: 419, top: 310 },
            { img: require('./images/eyes-yellow.png'), thumb: require('./thumbs/eyes-yellow.png'),
                left: 419, top: 310 },
            { img: require('./images/eyes-red.png'), thumb: require('./thumbs/eyes-red.png'),
                left: 419, top: 310 },
            { img: require('./images/eyes-purple.png'), thumb: require('./thumbs/eyes-purple.png'),
                left: 419, top: 310 },
            { img: require('./images/eyes-orange.png'), thumb: require('./thumbs/eyes-orange.png'),
                left: 419, top: 310 }
        ]
    },
    {
        title: 'Kaulakorut',
        type: 'necklace',
        isEssential: false,
        thumb: require('./thumbs/category-necklace.png'),
        items: [
            { img: require('./images/necklace-white.png'), thumb: require('./thumbs/necklace-white.png'),
                left: 469, top: 412 },
            { img: require('./images/necklace-white2.png'), thumb: require('./thumbs/necklace-white2.png'),
                left: 469, top: 412 },
            { img: require('./images/necklace-yellow.png'), thumb: require('./thumbs/necklace-yellow.png'),
                left: 462, top: 413 },
            { img: require('./images/necklace-blue.png'), thumb: require('./thumbs/necklace-blue.png'),
                left: 466, top: 411 },
            { img: require('./images/necklace-many-black.png'), thumb: require('./thumbs/necklace-many-black.png'),
                left: 454, top: 411 },
            { img: require('./images/necklace-stone.png'), thumb: require('./thumbs/necklace-stone.png'),
                left: 466, top: 415 },
            { img: require('./images/necklace-pink.png'), thumb: require('./thumbs/necklace-pink.png'),
                left: 469, top: 410 }
        ]
    },
    {
        title: 'Siivet',
        type: 'wings',
        isEssential: false,
        thumb: require('./thumbs/category-wings.png'),
        items: [
            { img: require('./images/wings-pink.png'), thumb: require('./thumbs/wings-pink.png'),
                left: 25, top: 29 },
            { img: require('./images/wings-pink2.png'), thumb: require('./thumbs/wings-pink2.png'),
                left: 50, top: 140 },
            { img: require('./images/wings-pink3.png'), thumb: require('./thumbs/wings-pink3.png'),
                left: 50, top: 140 },
            { img: require('./images/wings-red.png'), thumb: require('./thumbs/wings-red.png'),
                left: 107, top: 107 },
            { img: require('./images/wings-bw.png'), thumb: require('./thumbs/wings-bw.png'),
                left: 244, top: 249 },
            { img: require('./images/wings-bluered.png'), thumb: require('./thumbs/wings-bluered.png'),
                left: 37, top: 23 }
        ]
    },
    {
        title: 'Paidat',
        type: 'chest',
        isEssential: false,
        thumb: require('./thumbs/category-chest.png'),
        items: [
            { img: require('./images/dress-blue.png'), thumb: require('./thumbs/dress-blue.png'),
                left: 439, top: 406 },
            { img: require('./images/dress-redblue.png'), thumb: require('./thumbs/dress-redblue.png'),
                left: 353, top: 326 },
            { img: require('./images/dress-yellow.png'), thumb: require('./thumbs/dress-yellow.png'),
                left: 247, top: 412 },
            { img: require('./images/dress-yellow2.png'), thumb: require('./thumbs/dress-yellow2.png'),
                left: 287, top: 411 },
            { img: require('./images/dress-yellow-white.png'), thumb: require('./thumbs/dress-yellow-white.png'),
                left: 223, top: 345 },
            { img: require('./images/dress-heart.png'), thumb: require('./thumbs/dress-heart.png'),
                left: 387, top: 413 },
            { img: require('./images/dress-elsa.png'), thumb: require('./thumbs/dress-elsa.png'),
                left: 287, top: 422 },
            { img: require('./images/dress-dots.png'), thumb: require('./thumbs/dress-dots.png'),
                left: 348, top: 401 },
            { img: require('./images/dress-dotty.png'), thumb: require('./thumbs/dress-dotty.png'),
                left: 352, top: 417 },
            { img: require('./images/dress-drawn.png'), thumb: require('./thumbs/dress-drawn.png'),
                left: 243, top: 400 },
            { img: require('./images/dress-drawn2.png'), thumb: require('./thumbs/dress-drawn2.png'),
                left: 276, top: 404 },
            { img: require('./images/dress-lilac-yellow.png'), thumb: require('./thumbs/dress-lilac-yellow.png'),
                left: 278, top: 416 },
            { img: require('./images/dress-long-side.png'), thumb: require('./thumbs/dress-long-side.png'),
                left: 317, top: 415 },
            { img: require('./images/jacket-black.png'), thumb: require('./thumbs/jacket-black.png'),
                left: 374, top: 401 },
            { img: require('./images/mermaid-bra.png'), thumb: require('./thumbs/mermaid-bra.png'),
                left: 443, top: 448 },
            { img: require('./images/chest-swimsuit.png'), thumb: require('./thumbs/chest-swimsuit.png'),
                left: 386, top: 413 }
        ]
    },
    {
        title: 'Housut',
        type: 'leg',
        isEssential: false,
        thumb: require('./thumbs/category-leg.png'),
        items: [
            { img: require('./images/skirt-red.png'), thumb: require('./thumbs/skirt-red.png'),
                left: 421, top: 529 },
            { img: require('./images/skirt-pink.png'), thumb: require('./thumbs/skirt-pink.png'),
                left: 397, top: 534 },
            { img: require('./images/skirt-orange.png'), thumb: require('./thumbs/skirt-orange.png'),
                left: 322, top: 530 },
            { img: require('./images/jeans-blue.png'), thumb: require('./thumbs/jeans-blue.png'),
                left: 370, top: 545 },
            { img: require('./images/mermaid-tail.png'), thumb: require('./thumbs/mermaid-tail.png'),
                left: 290, top: 529 },
            { img: require('./images/pants-colorful.png'), thumb: require('./thumbs/pants-colorful.png'),
                left: 371, top: 541 }
        ]
    },
    {
        title: 'Kengät',
        type: 'shoes',
        isEssential: false,
        thumb: require('./thumbs/category-shoes.png'),
        items: [
            { img: require('./images/shoes-blue.png'), thumb: require('./thumbs/shoes-blue.png'),
                left: 373, top: 888, isDefault: true },
            { img: require('./images/shoes-yellow.png'), thumb: require('./thumbs/shoes-yellow.png'),
                left: 369, top: 872 },
            { img: require('./images/shoes-yellow2.png'), thumb: require('./thumbs/shoes-yellow2.png'),
                left: 371, top: 872 },
            { img: require('./images/shoes-black.png'), thumb: require('./thumbs/shoes-black.png'),
                left: 372, top: 904 },
            { img: require('./images/shoes-whiteblack.png'), thumb: require('./thumbs/shoes-whiteblack.png'),
                left: 372, top: 732 },
            { img: require('./images/shoes-brown.png'), thumb: require('./thumbs/shoes-brown.png'),
                left: 372, top: 888 }
        ]
    }
]

export default categories
