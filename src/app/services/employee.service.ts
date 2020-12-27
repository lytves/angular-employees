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

  deleteEmployee(id: string): Promise<any> {
      return this.fireStore.collection('employees').doc(id).delete();
  }

  getEmployee(id: string): Observable<any> {
    return this.fireStore.collection('employees').doc(id).snapshotChanges();
  }

  updateEmployee(id: string, data: any): Promise<any> {
    return this.fireStore.collection('employees').doc(id).update(data);
  }
}
