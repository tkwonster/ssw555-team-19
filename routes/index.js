import foodRoutes from './food.js';

const constructorMethod = (app) => {
  app.use('/', foodRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;