import { Router } from 'express';

const apiViewRouter = Router();

const path = '/api/';

apiViewRouter.get(path, (req, res) => {
  res.render('api', {
    css: 'api.css',
  });
});

export default apiViewRouter;
