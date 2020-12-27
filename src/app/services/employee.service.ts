import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fireStore: AngularFirestore) {
  }

  applyEmployee(employee: any): Promise<any> {
    return this.fireStore.collection('employees').add(employee);
  }
}
