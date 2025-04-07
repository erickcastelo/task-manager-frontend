import { Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { TaskListPageComponent } from './module/task/pages/task-list-page/task-list-page.component';
import { TaskCreatePageComponent } from './module/task/pages/task-create-page/task-create-page.component';

export const routes: Routes = [
  {
    path: 'task',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: TaskListPageComponent,
      },
      {
        path: 'create',
        component: TaskCreatePageComponent,
      },
      {
        path: 'edit/:id',
        component: TaskCreatePageComponent,
      },
    ],
  },
];
