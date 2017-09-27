// Modules
const Router = require("koa-router");
const _ = require("lodash");

const router = new Router({
  prefix: "/users"
});

router
  .get("/", async (ctx, next) => {
    const model = ctx.pg.model("user");

    const { _paging, _order, _q, ..._query } = ctx.query;
    const where = _.reduce(
      _query,
      (_where, val, field) => {
        // Search with string
        if (
          _.includes(["username", "email", "first_name", "last_name"], field)
        ) {
          return _.assign({ [field]: { $ilike: `%${val}%` } });
        }
        // Search with number
        if (_.includes(["status"], field)) {
          // Conver to number
          val = _.toNumber(val);
          // If it is not a number
          if (_.isNaN(val)) val = -1;
        }

        // Return query
        return _.assign(_where, { [field]: val });
      },
      {}
    );

    let conditions = _.assign({}, _paging, _order, { where });
    const result = await model.findAndCountAll(conditions);

    return (ctx.body = {
      data: _.map(result.rows, user => user.get({ plain: true })),
      total: result.count
    });
  })
  .post("/", async (ctx, next) => {});

router
  .param("id", async (id, ctx, next) => {
    const model = ctx.pg.model("user");
    const user = await model.findById(id);
    if (!user) {
      ctx.status = 404;
      return (ctx.body = { message: `User #${id} is not found.` });
    }

    ctx.user = user.get({ plain: true });
    await next();
  })
  .get("/:id", (ctx, next) => (ctx.body = { data: ctx.user }))
  .put("/:id", (ctx, next) => (ctx.body = "Update user"))
  .del("/:id", (ctx, next) => (ctx.body = "Delete user"));

module.exports = router;
