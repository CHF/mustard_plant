var express = require('express'),
    router = express.Router();

router.get('/:id', function (req, res) {
  res.json({
    account: req.params.id
  });
});

module.exports = router;
