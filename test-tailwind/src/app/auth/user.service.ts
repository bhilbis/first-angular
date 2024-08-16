import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,Observable, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://192.168.5.200:84/api/';

  constructor(private http: HttpClient, private router: Router) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}User`;
    return this.http.post(url, user, { responseType: 'text' });
  }
  
  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}User/ChangePassword`;
    const body = { oldPassword, newPassword };
    return this.http.post(url, body, { headers: this.getAuthHeaders() ,responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error Change Password', error);
        throw error(() => new Error(error.message || 'Server Error' ));
      })
    );  
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}General/Login`;
    return this.http.post(url, { emailAddress: email, password: password }).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem('userId', response.userId)
          console.log(response.accessToken)
        }
      }));
  }

  getUser(id: number): Observable<any> {
    const url = `${this.baseUrl}User/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }


  getEquipment(): Observable<any> {
    const url = `${this.baseUrl}Equipment`;
    return this.http.get(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching equipment data', error);
        return throwError(() => new Error(error.message || 'Server Error'));
      })
    );
  }

  getEquipmentById(id: number): Observable<any> {
    const url = `${this.baseUrl}Equipment/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  addEquipment(equipment: any): Observable<any> {
    const url = `${this.baseUrl}Equipment`;
    return this.http.post(url, equipment, { headers: this.getAuthHeaders() });
  }

  updateEquipment(equipment: any): Observable<any> {
    const url = `${this.baseUrl}Equipment`;
    return this.http.put(url, equipment, { headers: this.getAuthHeaders() });
  }

  deleteEquipment(id: number): Observable<any> {
    const url = `${this.baseUrl}Equipment/${id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }
  
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
