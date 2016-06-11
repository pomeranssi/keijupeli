(function($, _, util) {
    "use strict";

    var maxLetters = 20;

    var words = normalizeWords([
        {
            img: "koira.jpg",
            word: ["koira", "hauva"]
        },
        {
            img: "heppa.jpg",
            word: ["heppa", "hevonen"]
        },
        {
            img: "possu.jpg",
            word: ["possu", "porsas", "sika"]
        },
        "pallo", "kukka", "kana", "kissa", "orava", "omena"
    ]);

    function selectWord() {
        return util.getRandomEntry(words);
    }

    function selectLetters(word, max) {
        var needed = {};
        _.forEach(word.word, function(w) {
            _.forEach(util.getLetterCounts(w), function(c, l) {
                needed[l] = needed[l] ? Math.max(needed[l], c) : c;
            });
        });

        var letters = [];
        _.forEach(needed, function(c, l) {
            for (var i = 0; i < c; ++i) {
                letters.push(l);
            }
        });
        for (var i = letters.length; i < max; i++) {
            letters.push(util.getRandomLetter());
        }
        return util.shuffle(letters);
    }

    function normalizeWords(words) {
        return _.map(words, function(word) {
            // Convert to object
            var w = _.isString(word) ? { word: [word] } : word;
            // Check that word is an array (contains all accepted words)
            w.word = _.isArray(w.word) ? w.word : [w.word];
            // Check that img is defined
            w.img = w.img || w.word[0] + ".jpg";
            return w;
        });
    }

    function init() {
        newGame();
        $(".new-game").click(newGame);
    }

    function newGame() {
        clearGame();
        createGame();
    }

    function clearGame() {
        $("#letters").html("");
        $("#selection").html("").removeClass("correct").removeClass("incorrect").removeClass("partial");
        $("#result").hide();
        $("#image").html("");
    }

    function createGame() {
        var word = selectWord();
        console.log("Selected", word.word[0]);
        var img = createImage(word);
        $("#image").append(img);

        var letters = selectLetters(word, maxLetters);
        createLetters(letters, word);
    }

    function createImage(word) {
        var img = $("<img/>").attr("src", "img/" + word.img);
        return img;
    }

    function createLetters(letters, word) {
        var $letters = $("#letters");
        _.forEach(letters, function(l) {
            var e = createLetterElement(l);
            e.on("click", function() { selectLetter(e, word); });
            $letters.append(e);
        });
    }

    function createLetterElement(letter) {
        var e = $("<div/>").addClass("letter").attr("data-letter", letter).text(letter);
        return e;
    }

    function selectLetter(l, word) {
        var $el = l;
        if (!$el.hasClass("selected")) {
            var letter = $el.attr("data-letter");
            console.log("Selecting", letter);
            $el.addClass("selected");

            var s = createLetterElement(letter);
            $("#selection").append(s);
            s.on("click", function() {
                $el.removeClass("selected");
                s.remove();
                checkSelection(word);
            });

            checkSelection(word);
        }
    }

    function checkSelection(word) {
        var sel = "";
        var area = $("#selection");
        $.each(area.children(), function(i, s) {
            sel += $(s).attr("data-letter");
        });
        var correct = _.find(word.word, function(w) { return w == sel; }) !== undefined;
        var partial = !correct && _.find(word.word, function(w) { return sel.length < w.length && w.substring(0, sel.length) == sel; }) !== undefined;
        console.log("Current word is", sel, "- it is correct/partial:", correct, partial);
        area.removeClass("correct").removeClass("partial").removeClass("incorrect");
        if (correct) {
            area.addClass("correct");
            endGame();
        }
        else if (partial) {
            area.addClass("partial");
        } else {
            area.addClass("incorrect");
        }
    }

    function endGame() {
        // Disable letter functionality
        $("#letters .letter").off("click");
        $("#selection .letter").off("click");
        // Show result
        $("#result").show();
    }

    window.sanapeli = {
        words: words
    };

    $(document).ready(init);
})(jQuery, _, util);
