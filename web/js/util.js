window.util = (function($, _) {
    "use strict";

    var util = {
        weightedLetters: "aaaaaaaaaaaaiiiiiiiiiiittttttttttnnnnnnnnneeeeeeeesssssssslllllloooookkkkkuuuuuääääämmmmvvvrrjjhhyyppdö"
    };

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    util.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    // Returns a random entry from the given array
    util.getRandomEntry = function(array) {
        return array[util.getRandomInt(0, array.length)];
    };

    // Returns the count of letters in a given word
    util.getLetterCounts = function(str) {
        var letters = {};
        for (var i = 0; i < str.length; ++i) {
            var letter = str[i];
            letters[letter] = letters[letter] > 0 ? letters[letter] + 1 : 1;
        }
        return letters;
    };

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    util.shuffle = function(a) {
        var n = a.length;
        for (var i = 0; i < n - 1; i++) {
            var j = util.getRandomInt(0, n - i);
            // Swap a[i] and a[i + j]
            var s = a[i];
            a[i] = a[i + j];
            a[i + j] = s;
        }
        return a;
    };

    util.getRandomLetter = function() {
        return util.getRandomEntry(util.weightedLetters);
    };

    return util;
})(jQuery, _);
