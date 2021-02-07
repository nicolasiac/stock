var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

var connectionPool = require('../database');

/* GET stocks listing. */
router.get('/', function (req, res, next) {

    connectionPool.query('CALL StocksList()', function (err, rows, fields) {
        if (err) throw err
        res.json({ items: rows[0] });
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    let sql = 'CALL StockTransactionInsert(?, ?, ?, ?, ?, ?)';

    connectionPool.query(sql, [req.body.stockid, req.body.name, req.body.name, req.body.date, req.body.price, req.body.quantity], (err, result) => {
        if (err) {
            throw err;
        }

        res.send(req.body);
    });
});


router.delete('/', function (req, res, next) {
    console.log('Delete', req.body);
    let sql = 'CALL StockTransactionDelete(?)';

    connectionPool.query(sql, [req.body.transactionid], (err, result) => {
        if (err) {
            throw err;
        }

        res.send(req.body);
    });
});

router.get('/fetch', async (req, res, next) => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ height: 768, width: 1024 });
    await page.goto('https://finance.yahoo.com/quote/MSFT');


    await page.click('.primary');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const element = await page.$$eval('span',
        anchors => {
            return anchors
                .filter(anchor => anchor.getAttribute('data-reactid') === '32')
                .map(anchor =>
                    anchor.textContent
                )
                .slice(0, 1)
        });


    console.log(element);

    await browser.close();

    res.send(element);
});

module.exports = router;
