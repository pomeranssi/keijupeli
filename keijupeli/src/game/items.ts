export interface Category {
    readonly title: string,
    readonly type: string,
    readonly isBackground?: boolean,
    readonly items: Array<Item>
}

export interface Item {
    readonly img: string,
    readonly left: number,
    readonly top: number
    readonly isDefault?: boolean,
    readonly zIndex?: number
}

const items: Array<Category> = [
    {
        title: 'Taustat',
        type: 'background',
        isBackground: true,
        items: [
            { img: require('./images/bg-castle.jpg'), left: 0, top: 0 },
            { img: require('./images/bg-beach.jpg'), left: 0, top: 0, isDefault: true },
            { img: require('./images/bg-snow.jpg'), left: 0, top: 0 },
            { img: require('./images/bg-castle-carrots.jpg'), left: 0, top: 0 },
            { img: require('./images/bg-ocean.jpg'), left: 0, top: 0 }
        ]
    },
    {
        title: 'Vartalot',
        type: 'body',
        items: [
            { img: require('./images/girl-white.png'), left: 336, top: 198, isDefault: true },
            { img: require('./images/girl-latino.png'), left: 336, top: 198 }
        ]
    },
    {
        title: 'Siivet',
        type: 'wings',
        items: [
            { img: require('./images/wings-pink.png'), left: 25, top: 29 },
            { img: require('./images/wings-pink2.png'), left: 50, top: 140 },
            { img: require('./images/wings-pink3.png'), left: 50, top: 140 },
            { img: require('./images/wings-red.png'), left: 106, top: 146 },
            { img: require('./images/wings-bw.png'), left: 244, top: 249 }
        ]
    },
    {
        title: 'Silmät',
        type: 'eyes',
        items: [
            { img: require('./images/eyes-blue.png'), left: 419, top: 310, isDefault: true },
            { img: require('./images/eyes-green.png'), left: 419, top: 310 },
            { img: require('./images/eyes-brightgreen.png'), left: 419, top: 310 },
            { img: require('./images/eyes-brown.png'), left: 419, top: 310 },
            { img: require('./images/eyes-pink.png'), left: 419, top: 310 },
            { img: require('./images/eyes-yellow.png'), left: 419, top: 310 },
            { img: require('./images/eyes-red.png'), left: 419, top: 310 },
            { img: require('./images/eyes-purple.png'), left: 419, top: 310 },
            { img: require('./images/eyes-orange.png'), left: 419, top: 310 }
        ]
    },
    {
        title: 'Hiukset',
        type: 'hair',
        items: [
            { img: require('./images/hair-orig.png'), left: 335, top: 150, isDefault: true },
            { img: require('./images/hair-yellow.png'), left: 329, top: 148 },
            { img: require('./images/hair-elsa.png'), left: 369, top: 166 },
            { img: require('./images/hair-brown.png'), left: 366, top: 188 },
            { img: require('./images/hair-pink-short.png'), left: 373, top: 191 },
            { img: require('./images/hair-pink-long.png'), left: 247, top: 171, zIndex: 45 },
            { img: require('./images/hair-black.png'), left: 352, top: 169 }
        ]
    },
    {
        title: 'Hameet ja housut',
        type: 'leg',
        items: [
            { img: require('./images/skirt-red.png'), left: 421, top: 529 },
            { img: require('./images/skirt-pink.png'), left: 397, top: 534 },
            { img: require('./images/skirt-orange.png'), left: 322, top: 530 },
            { img: require('./images/jeans-blue.png'), left: 370, top: 545 },
            { img: require('./images/mermaid-tail.png'), left: 290, top: 529 },
            { img: require('./images/pants-colorful.png'), left: 371, top: 541 }
        ]
    },
    {
        title: 'Paidat ja mekot',
        type: 'chest',
        items: [
            { img: require('./images/dress-blue.png'), left: 439, top: 406 },
            { img: require('./images/dress-redblue.png'), left: 353, top: 326 },
            { img: require('./images/dress-yellow.png'), left: 247, top: 412 },
            { img: require('./images/dress-yellow2.png'), left: 287, top: 411 },
            { img: require('./images/dress-yellow-white.png'), left: 223, top: 345 },
            { img: require('./images/dress-heart.png'), left: 387, top: 413 },
            { img: require('./images/dress-elsa.png'), left: 287, top: 422 },
            { img: require('./images/dress-dots.png'), left: 348, top: 401 },
            { img: require('./images/dress-dotty.png'), left: 352, top: 417 },
            { img: require('./images/dress-lilac-yellow.png'), left: 278, top: 416 },
            { img: require('./images/dress-long-side.png'), left: 317, top: 415 },
            { img: require('./images/jacket-black.png'), left: 374, top: 401 },
            { img: require('./images/mermaid-bra.png'), left: 443, top: 448 }
        ]
    },
    {
        title: 'Kengät',
        type: 'shoes',
        items: [
            { img: require('./images/shoes-blue.png'), left: 373, top: 888, isDefault: true },
            { img: require('./images/shoes-yellow.png'), left: 369, top: 872 },
            { img: require('./images/shoes-yellow2.png'), left: 371, top: 872 },
            { img: require('./images/shoes-black.png'), left: 372, top: 904 },
            { img: require('./images/shoes-whiteblack.png'), left: 372, top: 732 },
            { img: require('./images/shoes-brown.png'), left: 372, top: 888 }
        ]
    },
    {
        title: 'Kaulakorut',
        type: 'necklace',
        items: [
            { img: require('./images/necklace-white.png'), left: 469, top: 412 },
            { img: require('./images/necklace-white2.png'), left: 469, top: 412 },
            { img: require('./images/necklace-yellow.png'), left: 462, top: 413 },
            { img: require('./images/necklace-blue.png'), left: 466, top: 411 },
            { img: require('./images/necklace-many-black.png'), left: 454, top: 411 },
            { img: require('./images/necklace-stone.png'), left: 466, top: 415 },
            { img: require('./images/necklace-pink.png'), left: 469, top: 410 }
        ]
    },
    {
        title: 'Kruunut ja tiarat',
        type: 'crown',
        items: [
            { img: require('./images/tiara-yellow.png'), left: 383, top: 201 },
            { img: require('./images/crown-yellow.png'), left: 377, top: 124 },
            { img: require('./images/crown-hearts.png'), left: 381, top: 98 },
            { img: require('./images/hat-colorful.png'), left: 266, top: 140 }
        ]
    }
]

export default items
