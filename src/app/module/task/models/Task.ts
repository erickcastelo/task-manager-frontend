import { TaskEnum } from './TaskEnum';

export class Task {
  private title: string;
  private description: string;
  private status: TaskEnum;
  private dueAt: Date | string;
  private user?: number;

  constructor(
    title: string,
    description: string,
    status: TaskEnum,
    dueAt: Date | string,
    user: number
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueAt = dueAt;
    this.user = user;
  }
}
