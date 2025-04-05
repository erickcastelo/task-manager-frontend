import { Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { TaskListPageComponent } from './module/task/pages/task-list-page/task-list-page.component';

export const routes: Routes = [
  {
    path: 'task',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: TaskListPageComponent,
      },
    ],
  },
];
