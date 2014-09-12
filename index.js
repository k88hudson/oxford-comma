var cheerio = require('cheerio');

module.exports = function addOxfordCommas(html) {
    var $ = cheerio.load(html);
    function getTextNode(el) {
        if (el.type === 'text') {
            var parts = el.data.match(/((?:[\w'-]+,\s+)+(?:[\w'-]+\s){0,2}[\w'-]+)(\s+(?:and|or)\s+[\w'-]+)/);
            if (parts) {
                var withOxford = parts[1] + ',' + parts[2];
                el.data = withOxford;
            }
        }
        if (el.children && el.children.length) {
            el.children.forEach(getTextNode);
        }
    }

    $._root.children.forEach(getTextNode);
    return $.html();
}

