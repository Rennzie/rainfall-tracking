const Farm = require('../models/farm.schema');

function farmsIndex(req, res, next) {
  Farm.query()
    .then(farms => res.json(farms))
    .catch(next);
}

// const farmShow = async (req, res, next) => {
//   const farms = await Farm.query()
//     .findById(req.params.id)
//     .eager('rainfall');

//   res.json(farms);
// };

function farmShow(req, res, next) {
  Farm.query()
    .findById(req.params.id)
    // .eager('rainfall')
    .then(farm => res.json(farm))
    .catch(next);
}

module.exports = {
  index: farmsIndex,
  show: farmShow
};
