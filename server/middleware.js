var bodyParser  = require('body-parser'),
    morgan = require('morgan');

module.exports = function (app, express) {
  var userRouter = express.Router(),
      eventsRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/events', eventsRouter); // user link router for link request

  // inject our routers into their respective route files
  require('./users/users-routes.js')(userRouter);
  require('./events/events-routes.js')(eventsRouter);
};


