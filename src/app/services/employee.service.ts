import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fireStore: AngularFirestore) {
  }

  applyEmployee(employee: any): Promise<any> {
    return this.fireStore.collection('employees').add(employee);
  }

  getEmployees(): Observable<any> {
    return this.fireStore.collection('employees', ref => ref.orderBy('createDate', 'asc'))
      .snapshotChanges();
  }
}
