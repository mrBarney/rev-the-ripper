const fs = require('fs');

const allText = JSON.parse(fs.readFileSync('./transcript.json')).monologues;
const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]));
const contains = (l, x) => l.filter(e => e == x).length ? true : false;

function avg_dur(elems) {
    const text_elems = elems.filter(x => x.type == 'text');

    // Compute avg duration
    let avg_dur = 0;
    for (let i = 0; i < text_elems.length - 1; i++) {
        avg_dur += text_elems[i + 1].ts - text_elems[i].end_ts;
    }
    return avg_dur / text_elems.length
}

function starter_words(elems) {
    let starter_words = []
    for (let i = 0; i < elems.length - 1; i++)
        if (elems[i].value == '. ')
            starter_words.push(elems[i + 1]);

    return starter_words
}

function starter_words_index(elems) {
    let starter_words = []
    for (let i = 0; i < elems.length - 1; i++)
        if (elems[i].value == '. ')
            starter_words.push(i + 1);

    return starter_words
}

function word_diffs(elems) {
    let diffs = []
    for (let i = 0; i < elems.length - 1; i++)
        diffs.push(elems[i + 1].ts - elems[i].end_ts)
    return diffs
}

function word_diffs_by_index(idxs, elems) {
    let diffs = [];
    return idxs.map(i => elems[i + 2].ts - elems[i].end_ts)
}

function enumerate(l) {
    let x = []
    for (let i = 0; i < l.length; i++)
        x.push([l[i], i])
    return x
}

function to_html(elems, starter_word_idxs, utube_url) {
    // Replace starter word index-1 value with youtube link to word ts
    starter_word_idxs.forEach((i, _) => {
        elems[i - 1].value = '<a href=' + utube_url + '?t=' + Math.floor(elems[i].ts) + '>.</a>'
    });
    return elems
    // Replace each word after a newline with a youtube link
    //text.replace(/\.\n/g, "<a href=utube_url+'&t=x'>.</a>\n")
}

let elems = allText[0].elements.concat(allText[1].elements);
const s = starter_words_index(elems);
const diffs = word_diffs_by_index(s, elems);
elems = to_html(elems, s, 'www.youtube.com/fuknutz');

const topd = zip([diffs, s]).sort((a, b) => b[0] - a[0]).slice(0, 6);
const top_idxs = topd.map(x => x[1]);

const text = enumerate(elems).reduce(
    (acc, e) => {
        if (contains(top_idxs, e[1])) acc += '\n';
        return acc + e[0].value
    }, '');

console.log(text);
