import { Router } from 'express';

const rootRouter = Router();

const path = '/';

rootRouter.get(path, (req, res) => {
  res.json({
    bienvenida: 'Luciano',
    fileCss: 'style.css',
  });
});

export default rootRouter;
