(function($, _) {
    "use strict";

    /**
     * Currently selected (and shown) clothes.
     * Key = item type (e.g., "leg")
     * Value = element
     */
    var selected = {};

    var items = [
        {
            title: "Taustat",
            type: "background",
            items: [
                { img: "bg-castle.jpg", left: 0, top: 0 },
                { img: "bg-beach.jpg", left: 0, top: 0, class: "default" },
                { img: "bg-snow.jpg", left: 0, top: 0 },
                { img: "bg-castle-carrots.jpg", left: 0, top: 0 },
                { img: "bg-ocean.jpg", left: 0, top: 0 }
            ]
        },
        {
            title: "Vartalot",
            type: "body",
            items: [
                { img: "girl-white.png", left: 336, top: 198, class: "default" },
                { img: "girl-latino.png", left: 336, top: 198 }
            ]
        },
        {
            title: "Siivet",
            type: "wings",
            items: [
                { img: "wings-pink.png", left: 25, top: 29 },
                { img: "wings-pink2.png", left: 50, top: 140 },
                { img: "wings-pink3.png", left: 50, top: 140 },
                { img: "wings-red.png", left: 106, top: 146 },
                { img: "wings-bw.png", left: 244, top: 249 }
            ]
        },
        {
            title: "Silmät",
            type: "eyes",
            items: [
                { img: "eyes-blue.png", left: 419, top: 310, class: "default" },
                { img: "eyes-green.png", left: 419, top: 310 },
                { img: "eyes-brightgreen.png", left: 419, top: 310 },
                { img: "eyes-brown.png", left: 419, top: 310 },
                { img: "eyes-pink.png", left: 419, top: 310 },
                { img: "eyes-yellow.png", left: 419, top: 310 },
                { img: "eyes-red.png", left: 419, top: 310 },
                { img: "eyes-purple.png", left: 419, top: 310 },
                { img: "eyes-orange.png", left: 419, top: 310 }
            ]
        },
        {
            title: "Hiukset",
            type: "hair",
            items: [
                { img: "hair-orig.png", left: 335, top: 150, class: "default" },
                { img: "hair-yellow.png", left: 329, top: 148 },
                { img: "hair-elsa.png", left: 369, top: 166 },
                { img: "hair-brown.png", left: 366, top: 188 },
                { img: "hair-pink-short.png", left: 373, top: 191 },
                { img: "hair-pink-long.png", left: 247, top: 171, zIndex: "45" },
                { img: "hair-black.png", left: 352, top: 169 }
            ]
        },
        {
            title: "Hameet ja housut",
            type: "leg",
            items: [
                { img: "skirt-red.png", left: 421, top: 529 },
                { img: "skirt-pink.png", left: 397, top: 534 },
                { img: "skirt-orange.png", left: 322, top: 530 },
                { img: "jeans-blue.png", left: 370, top: 545 },
                { img: "mermaid-tail.png", left: 290, top: 529 },
                { img: "pants-colorful.png", left: 371, top: 541 }
            ]
        },
        {
            title: "Paidat ja mekot",
            type: "chest",
            items: [
                { img: "dress-blue.png", left: 439, top: 406 },
                { img: "dress-redblue.png", left: 353, top: 326 },
                { img: "dress-yellow.png", left: 247, top: 412 },
                { img: "dress-yellow2.png", left: 287, top: 411 },
                { img: "dress-yellow-white.png", left: 223, top: 345 },
                { img: "dress-heart.png", left: 387, top: 413 },
                { img: "dress-elsa.png", left: 287, top: 422 },
                { img: "dress-dots.png", left: 348, top: 401 },
                { img: "dress-dotty.png", left: 352, top: 417 },
                { img: "dress-lilac-yellow.png", left: 278, top: 416 },
                { img: "dress-long-side.png", left: 317, top: 415 },
                { img: "jacket-black.png", left: 374, top: 401 },
                { img: "mermaid-bra.png", left: 443, top: 448 }
            ]
        },
        {
            title: "Kengät",
            type: "shoes",
            items: [
                { img: "shoes-blue.png", left: 373, top: 888, class: "default" },
                { img: "shoes-yellow.png", left: 369, top: 872 },
                { img: "shoes-yellow2.png", left: 371, top: 872 },
                { img: "shoes-black.png", left: 372, top: 904 },
                { img: "shoes-whiteblack.png", left: 372, top: 732 },
                { img: "shoes-brown.png", left: 372, top: 888 }
            ]
        },
        {
            title: "Kaulakorut",
            type: "necklace",
            items: [
                { img: "necklace-white.png", left: 469, top: 412 },
                { img: "necklace-white2.png", left: 469, top: 412 },
                { img: "necklace-yellow.png", left: 462, top: 413 },
                { img: "necklace-blue.png", left: 466, top: 411 },
                { img: "necklace-many-black.png", left: 454, top: 411 },
                { img: "necklace-stone.png", left: 466, top: 415 },
                { img: "necklace-pink.png", left: 469, top: 410 }
            ]
        },
        {
            title: "Kruunut ja tiarat",
            type: "crown",
            items: [
                { img: "tiara-yellow.png", left: 383, top: 201 },
                { img: "crown-yellow.png", left: 377, top: 124 },
                { img: "crown-hearts.png", left: 381, top: 98 },
                { img: "hat-colorful.png", left: 266, top: 140 }
            ]
        }
    ];

    function init() {
        initItems(items);
    }

    function initItems(items) {
        _.forEach(items, createCategory);
        $(".item-list .default").click();
    }

    function createImage(item, type) {
        var e = $("<img/>").addClass("item").addClass(type);
        if (item.class) { e.addClass(item.class); }
        e.attr("src", "img/" + item.img);
        return e;
    }

    function createCategory(cat) {
        console.log("Adding category", cat.title);
        var parent = $("<div/>").addClass("category");
        parent.append($("<h2/>").text(cat.title));
        var itemList = $("<div/>").addClass("item-list");
        parent.append(itemList);

        _.forEach(cat.items, function(item) {
            var e = createImage(item, cat.type);
            itemList.append(e);
            e.click(function() { selectItem(cat.type, item); });
        });

        $("#item-area").append(parent);
    }

    function removeItem(type) {
        if (selected[type]) {
            selected[type].remove();
            delete selected[type];
        }
    }

    function selectItem(type, item) {
        removeItem(type);
        var e = createImage(item, type);
        e.css({ left: item.left, top: item.top });
        if (item.zIndex) e.css({ zIndex: item.zIndex })
        selected[type] = e;
        $("#portrait").append(e);
        e.click(function() { removeItem(type); });
    }

    window.keiju = {
        selected: selected,
        items: items
    };

    $(document).ready(init);
})(jQuery, _);
