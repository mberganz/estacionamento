import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { Report } from '../entities/report.entity';

class ReportController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reportRepository = getManager().getRepository(Report);

    const reports = await reportRepository.find({
      where: { park_id: req.params.park_id },
    });

    if (!reports) {
      return res.status(400).json({ error: 'Reports not found' });
    }

    return res.json(reports);
  }
}

export default new ReportController();
