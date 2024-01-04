import { Router } from 'express';

const rootViewRouter = Router();

const path = '/';

rootViewRouter.get(path, (req, res) => {
  res.send('Bienvenidos');
});

export default rootViewRouter;
