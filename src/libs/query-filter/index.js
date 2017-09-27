const _ = require("lodash");

module.exports = (options = {}) => async (ctx, next) => {
  // Only due with get method
  if (ctx.method !== "GET") return next();

  const { _page, _limit, _order, _q } = ctx.query;
  // Override request query
  _.assign(ctx.query, {
    _paging: parsePaging(_page, _limit),
    _order: parseOrder(_order),
    _q: parseFullTextSearch(_q)
  });

  // Don't keep redundant value
  delete ctx.query._page;
  delete ctx.query._limit;
  await next();
};

const parseOrder = ordering => {
  if (!_.isString(ordering)) ordering = _.toString(ordering);
  if (!ordering) return { order: [] };

  return {
    order: _.reduce(
      ordering.split(","),
      (_order, o) => {
        // Desc
        if (o[0] === "-") {
          _order.push([o.substring(1), "desc"]);
          return _order;
        }

        _order.push([o, "asc"]);
        return _order;
      },
      []
    )
  };
};
const parsePaging = (p, l) => {
  // Filter
  if (!_.isNumber(p)) p = _.toNumber(p);
  if (!_.isNumber(l)) l = _.toNumber(l);

  // "0" base
  --p;

  // Set valid value
  if (p < 0 || _.isNaN(p)) p = 0;
  if (l < 0 || _.isNaN(l)) l = 20;

  return { limit: l, offset: p * l };
};
const parseFullTextSearch = q => (_.isString(q) ? q : _.toString(q));
