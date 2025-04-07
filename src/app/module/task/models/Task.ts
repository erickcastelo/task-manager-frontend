import { TaskEnum } from './TaskEnum';

export class Task {
  public id: number;
  public title: string;
  public description: string;
  public status: TaskEnum;
  public dueAt: Date | string;
  public user?: number;

  constructor(
    id: number,
    title: string,
    description: string,
    status: TaskEnum,
    dueAt: Date | string,
    user: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueAt = dueAt;
    this.user = user;
  }
}
