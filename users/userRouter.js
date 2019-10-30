const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', (req, res) => {
    if (!Object.keys(req.body).includes("name")){
        return res.status(400).json({ errorMessage: "Please provide a name for the user." })
    }
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the user to the database"})
        });
});

router.post('/:id/posts', (req, res) => {
    if (!Object.keys(req.body).includes("text")){
        return res.status(400).json({ errorMessage: "Please provide text for the post." })
    }
    const post = {...req.body, user_id: req.params.id}; 
    console.log(req.params.id)
    console.log(post)
    Posts.insert(post)
        .then(user => {
            if (user) {
            res.status(201).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the post to the database"})
        });
});

router.get('/', (req, res) => {
    const query = req.query;

    Users.get(query)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving data',
            });
        });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Users.getById(req.params.id) 
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "The post information could not be retrieved."})
    });
});

router.get('/:id/posts', (req, res) => {
    Users.getUserPosts(req.params.id) 
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The comments information could not be retrieved."})
        });
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    Users.remove(req.params.id)
    .then(user => {
        if (user) {
        res.status(200).json({ message: "User deleted"});
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
    }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "The user could not be removed"})
    });
});

router.put('/:id', (req, res) => {
    if (!Object.keys(req.body).includes("name")){
        return res.status(400).json({ errorMessage: "Please provide a name for the user." })
    }
    const newInfo = req.body;
    Users.update(req.params.id, newInfo)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "The user information could not be modified.",
        });
      });
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
