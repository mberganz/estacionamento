import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import * as Yup from 'yup';

import { Park } from '../entities/park.entity';
import { Report } from '../entities/report.entity';

class ParkController {
  public async index(_req: Request, res: Response): Promise<Response> {
    const parkRepository = getManager().getRepository(Park);
    const parks = await parkRepository.find({});
    return res.json(parks);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      park: Yup.object().shape({
        number: Yup.number().integer().required(),
        open: Yup.boolean(),
        preferencial: Yup.boolean(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const parkRepository = getManager().getRepository(Park);
    const reportRepository = getManager().getRepository(Report);

    const checkParkExists = await parkRepository.findOne({
      where: { number: req.body.park.number },
    });

    if (checkParkExists) {
      return res.status(400).json({ error: 'Park already exists' });
    }

    const newPark = parkRepository.create({
      ...req.body.park,
    });

    const createdPark = await parkRepository.save(newPark);

    const newReport = reportRepository.create({
      park_id: (createdPark as any).id,
      open: (createdPark as any).open,
      duration: 0,
    });

    const createdReport = await reportRepository.save(newReport);

    return res.json({ park: createdPark, report: createdReport });
  }

  public async updatePark(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      open: Yup.boolean().required(),
      duration: Yup.number().integer().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const parkRepository = getManager().getRepository(Park);
    const reportRepository = getManager().getRepository(Report);

    const park = await parkRepository.findOne({
      where: { id: req.params.id },
    });

    if (!park) {
      return res.status(400).json({ error: 'Park not found' });
    }

    const newReport = reportRepository.create({
      park_id: park.id,
      open: req.body.open,
      duration: req.body.duration || 0,
    });

    const updatedPark = await parkRepository.save(park);
    const createdReport = await reportRepository.save(newReport);

    return res.json({ park: updatedPark, report: createdReport });
  }
}

export default new ParkController();
