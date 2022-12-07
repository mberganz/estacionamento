import { Router } from 'express';

import ParkController from './app/controllers/park.controller';
import ReportController from './app/controllers/report.controller';

const routes = Router();

routes.get('/parks', ParkController.index);
routes.post('/park', ParkController.store);
routes.post('/park/:id', ParkController.updatePark);
routes.get('/reports/:park_id', ReportController.index);

export default routes;
