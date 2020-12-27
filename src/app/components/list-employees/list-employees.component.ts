import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.employees = firestore.collection('employees').valueChanges();
  }

  ngOnInit(): void {
  }

}
