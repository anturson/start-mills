const express = require('express');

const objects = {
  form: [
    {
      _id: 1,
      name: 'Form 1',
    }, {
      _id: 2,
      name: 'Form 2',
    },
  ],
  job: [
    {
      _id: 1,
      name: 'Job 1',
    },
    {
      _id: 1,
      name: 'Job 1',
    },
  ],
};

module.exports = () => {
  const router = express.Router();

  router.route('/:entityName')
    .get((req, res) => {
      res.json(objects[req.params.entityName]);
    });

  return router;
};
