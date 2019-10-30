const express = require('express');
const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query;

    Posts.get(query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving data',
            });
        });
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;