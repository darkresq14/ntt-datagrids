import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeType } from '../types/user.types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeType[]> {
    return this.http.get<EmployeeType[]>('assets/MOCK_DATA.json');
  }
}
