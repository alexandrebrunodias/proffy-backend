import { Request, Response } from 'express';
import { db } from '../database/connection';

export default class ConnectionsController {

  async index(_, response: Response) {
    const [{ total }] = await db('connections').count('* as total');

    return response.json({
      total
    }).send();
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await db('connections').insert({
      user_id
    });

    return response.status(201).send();
  }

}