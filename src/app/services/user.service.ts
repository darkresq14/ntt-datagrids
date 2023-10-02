import { Injectable } from '@angular/core';
import { ApiUserType, GetUsersReturnType, UserType } from '../types/user.types';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users = new BehaviorSubject<UserType[]>([]);
  readonly users$: Observable<UserType[]> = this._users.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.http
      .get<GetUsersReturnType>('https://dummyjson.com/users')
      .pipe(
        map((res): UserType[] => {
          return res.users.map((user) => {
            return {
              name: `${user.firstName} ${user.lastName}`,
              company: user.company.name,
              department: user.company.department,
              title: user.company.title,
              city: user.company.address.city,
              addresses: [
                {
                  address: user.address.address,
                  city: user.address.city,
                  postalCode: user.address.postalCode,
                  state: user.address.state,
                },
              ],
            };
          });
        })
      )
      .subscribe({
        next: (users) => this._users.next(users),
        error: (error) => console.error('Error: ' + error),
      });
  }
}
