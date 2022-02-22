import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedAppModule } from '../shared/shared-app/shared-app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  }
];


@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedAppModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeesModule { }
