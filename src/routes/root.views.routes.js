import { Router } from 'express';

const rootViewRouter = Router();

const path = '/';

rootViewRouter.get(path, (req, res) => {
  res.render('root', {
    css: 'root.css',
  });
});

export default rootViewRouter;
