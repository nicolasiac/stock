var express = require('express');
var router = express.Router();

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


module.exports = router;
