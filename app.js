const express = require('express');
const bodyParser = require('body-parser');
const translate = require('@vitalets/google-translate-api');
// http://flip1.engr.oregonstate.edu:57666/
// node_modules/forever/bin/forever start app.js
// node_modules/forever/bin/forever stop app.js

const app = express();
const port = 57666;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.render("index");
});

/*
Translate source language to english

The source Language is auto-detected.
*/
app.post('/translate/from', (req, res) => {
    let txt = {
        translate: req.body.translate
    };

    translate(txt.translate).then(r => {
        console.log(res.text);
        //console.log(res.from.language.iso); //=> nl
        res.json({ translation: r.text });
    }).catch(err => {
        console.error(err);
    });

});

/*
This is the same as auto-detect.

The source Language is explicitly set by its iso code.
*/
app.post('/translate/to', (req, res) => {
    let txt = {
        translate: req.body.translate,
        iso: req.body.iso
    };

    translate(txt.translate, { to: txt.iso }).then(r => {
        console.log(res.text);
        //console.log(res.from.language.iso); //=> nl
        res.json({ translation: r.text });
    }).catch(err => {
        console.error(err);
    });

});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

