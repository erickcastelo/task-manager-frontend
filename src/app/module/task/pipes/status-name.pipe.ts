import { Pipe, PipeTransform } from '@angular/core';
import { TaskEnum } from '../models/TaskEnum';

@Pipe({
  name: 'statusName',
})
export class StatusNamePipe implements PipeTransform {
  transform(value: TaskEnum): string | undefined {
    const taskConvert = {
      [TaskEnum.PENDING]: 'Pendente',
      [TaskEnum.IN_PROGRESS]: 'Em andamento',
      [TaskEnum.COMPLETED]: 'Concluída',
    };

    return taskConvert[value] ?? 'unknown status';
  }
}
