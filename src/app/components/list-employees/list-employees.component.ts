import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(firestore: AngularFirestore, private _employeeService: EmployeeService) {
    // this.employees = firestore.collection('employees').valueChanges();
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this._employeeService.getEmployees().subscribe(data => {
      this.employees = [];
      data.forEach(e => {
        this.employees.push({
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        });
      });
      console.warn('employees', this.employees);
    });
  }

}
