(function($, _) {
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

    var weightedLetters = "aaaaaaaaaaaaiiiiiiiiiiittttttttttnnnnnnnnneeeeeeeesssssssslllllloooookkkkkuuuuuääääämmmmvvvrrjjhhyyppdö";

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function selectWord() {
        return words[getRandomInt(0, words.length)];
    }

    function getLetters(str) {
        var letters = [];
        for (var i = 0; i < str.length; ++i) {
            letters.push(str[i]);
        }
        return letters;
    }

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    function shuffle(a) {
        var n = a.length;
        for (var i = 0; i < n - 1; i++) {
            var j = getRandomInt(0, n - i);
            // Swap a[i] and a[i + j]
            var s = a[i];
            a[i] = a[i + j];
            a[i + j] = s;
        }
        return a;
    }

    function randomLetter() {
        return weightedLetters[getRandomInt(0, weightedLetters.length)];
    }

    function selectLetters(word, max) {
        var letters = [];
        _.forEach(word.word, function(w) { letters = letters.concat(getLetters(w)); });
        for (var i = letters.length; i < max; i++) {
            letters.push(randomLetter());
        }
        return shuffle(letters);
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
        $("#selection").html("");
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
            });

            checkSelection(word);
        }
    }

    function checkSelection(word) {
        var sel = "";
        $.each($("#selection").children(), function(i, s) {
            sel += $(s).attr("data-letter");
        });
        var correct = _.find(word.word, function(w) { return w == sel; }) !== undefined;
        console.log("Current word is", sel, correct);
        if (correct) {
            endGame();
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
        words: words,
        getLetters: getLetters
    };

    $(document).ready(init);
})(jQuery, _);
