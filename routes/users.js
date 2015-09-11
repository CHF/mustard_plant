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

});

/**
 * @api {post} /users/:id Get user
 * @apiVersion 0.0.1
 * @apiName CreateUser
 * @apiGroup Users
 * @apiParam (URI Params) {String} uuid The user's _id
 * @apiParam (Body Params) {String} uuid The user's _id
 */

router.post('/', (req, res, next) => {
  var newUser = new User();
  newUser.email = req.body.email;
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.password = req.body.password;
  newUser.username = req.body.username;
  newUser.save((err, user) => {
    if (err) {
      console.error(err);
      return res.json({
        error: err,
        success: false,
        user: null
      });
    }
    if (user) {
      return res.json({
        error: null,
        success: true,
        user
      });
    }
  });
});

module.exports = router;
