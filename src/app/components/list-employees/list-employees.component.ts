import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(firestore: AngularFirestore,
              private _employeeService: EmployeeService,
              private toastr: ToastrService) {
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
    });
  }

  deleteEmployee(id: string): void {
    this._employeeService.deleteEmployee(id).then(() => {
      throw new Error();
      this.toastr.success('Employee has been Removed!', 'Remove Employee', {positionClass: 'toast-bottom-right'});
    }).catch((error) => {
      this.toastr.error('Failed to remove!', 'Remove Employee', {positionClass: 'toast-bottom-right'});
    });
  }

}
