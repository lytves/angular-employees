import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ListEmployeesComponent} from './components/list-employees/list-employees.component';
import {CreateEmployeeComponent} from './components/create-employee/create-employee.component';
import {NavbarComponent} from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    NavbarComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
