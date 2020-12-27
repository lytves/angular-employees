import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createEmployee: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  componentTitle = 'Add Employee';

  constructor(private fb: FormBuilder,
              private _employeeService: EmployeeService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createEmployee = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      document: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEditing();
  }

  applyOrEditEmployee(): void {
    this.submitted = true;

    if (this.createEmployee.invalid) {
      this.loading = false;
      return;
    }

    const employee: any = {
      firstName: this.createEmployee.value.firstName,
      lastName: this.createEmployee.value.lastName,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      createDate: new Date(),
      editDate: new Date()
    };

    if (this.id === null) {
      this.applyEmployee(employee);
    } else {
      this.editEmployee(employee);
    }

  }

  applyEmployee(employee: any): void {
    this.loading = true;
    this._employeeService.applyEmployee(employee).then(() => {
      this.toastr.success('Employee has been applied!', 'Apply Employee', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['list-employees']);
    }).catch((error) => {
      console.error(error);
      this.toastr.error('Failed to apply!', 'Apply Employee', {positionClass: 'toast-bottom-right'});
    });
    this.loading = false;
  }

  editEmployee(employee: any): void {
    this.loading = true;
    Reflect.deleteProperty(employee, 'createDate');
    this._employeeService.updateEmployee(this.id, employee).then(() => {
      this.toastr.info('Employee has been edited!', 'Edit Employee', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['list-employees']);
    }).catch(error => {
      console.error(error);
      this.toastr.error('Failed to edit!', 'Edit Employee', {positionClass: 'toast-bottom-right'});
    });
    this.loading = false;
  }

  isEditing(): void {
    if (this.id !== null) {
      this.loading = true;
      this.componentTitle = 'Edit Employee';
      this._employeeService.getEmployee(this.id).subscribe(data => {
        this.loading = false;
        this.createEmployee.setValue({
          firstName: data.payload.data().firstName,
          lastName: data.payload.data().lastName,
          document: data.payload.data().document,
          salary: data.payload.data().salary
        });
      });
    }
  }

}
