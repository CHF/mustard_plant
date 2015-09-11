var express = require('express'),
    User = require('../models/users'),
    router = express.Router();

/**
 * @api {get} /users/:id Get user
 * @apiVersion 0.0.1
 * @apiName GetUser
 * @apiGroup Users
 * @apiParam (URI Params) {String} uuid The user's _id
 */
router.get('/:id', (req, res) => {
  let newUser = new User();
});

/**
 * @api {post} /users/:id Get user
 * @apiVersion 0.0.1
 * @apiName CreateUser
 * @apiGroup Users
 * @apiParam (URI Params) {String} uuid The user's _id
 * @apiParam (Body Params) {String} uuid The user's _id
 */

// router.post('/', (req, res, next) => {
//
// });

module.exports = router;
