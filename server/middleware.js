
var bodyParser  = require('body-parser');
var morgan = require('morgan');

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var eventsRouter = express.Router();
  var eventspageRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  app.use('/api/users', userRouter); // use user router for all user request

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use('/api/events', eventsRouter); // user link router for link request
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  app.use('/api/eventspage', eventspageRouter)

  require('./users/users-routes.js')(userRouter);
  require('./events/events-routes.js')(eventsRouter);
  require('./eventpage/eventpage-routes.js')(eventspageRouter)
};

