import { Request, Response } from 'express';
import { db } from '../database/connection';
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

export default class ClassesController {

  async index(request: Request, response: Response) {
    const filters = request.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if(!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({ error: 'Filters are needed to find a class' });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedules.*')
          .from('class_schedules')
          .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedules`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedules`.`from` <= ??', timeInMinutes)
          .whereRaw('`class_schedules`.`to` > ??', timeInMinutes)
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
    
      const [class_id] = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        }
      });
    
      await trx('class_schedules').insert(classSchedule);
    
      await trx.commit();
      return response.status(201).send();
  
    } catch (error) {
  
      console.log(error);
      trx.rollback();
      return response.status(400).json({
        error: 'Unexpected erro while creating the class'
      });
    }
  }
}