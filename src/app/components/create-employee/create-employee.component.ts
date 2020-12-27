import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';
import {Router} from '@angular/router';
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

  constructor(private fb: FormBuilder,
              private _employeeService: EmployeeService,
              private router: Router,
              private toastr: ToastrService) {
    this.createEmployee = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      document: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
  }

  applyEmployee(): void {
    this.submitted = true;
    this.loading = true;

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

    this._employeeService.applyEmployee(employee).then(() => {
      this.toastr.success('Employee has been applied!', 'Apply Employee', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['list-employees']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error('Failed to apply!', 'Apply Employee', {positionClass: 'toast-bottom-right'});
    });
  }

}
