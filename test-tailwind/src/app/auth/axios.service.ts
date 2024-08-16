import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private baseUrl = 'http://192.168.5.200:84/api/';

  constructor(private router: Router) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  register(user: any){
    return axios.post(`${this.baseUrl}User`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  updatePassword(oldPassword: string, newPassword: string){
    return axios.post(`${this.baseUrl}User/ChangePassword`, { oldPassword, newPassword}, { 
      headers: this.getAuthHeaders(),
    });
  }

  login(email: string, password: string): Promise<any> {
    const url = `${this.baseUrl}General/Login`;
    return axios.post(url, { emailAddress: email, password: password })
      .then(response => response.data)
      .catch(error => {
        throw error.response || error;
      });
  }

  getUser(id: number): Promise<any> {
    return axios.get(`${this.baseUrl}User/${id}`, {
      headers: this.getAuthHeaders(),
    })
      .then(response => response.data)
      .catch(error => {
        throw error.response || error;
      });
  }

  getEquipment(): Promise<any> {
    const url = `${this.baseUrl}Equipment`;
    return axios.get(url, { headers: this.getAuthHeaders() })
      .then(response => response.data)
      .catch(error => {
        throw error.response || error;
      });
  }

  getEquipmentById(id: number) {
    return axios.get(`${this.baseUrl}Equipment/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addEquipment(equipment: any): Promise<any> {
    const url = `${this.baseUrl}Equipment`;
    return axios.post(url, equipment, { headers: this.getAuthHeaders() })
      .then(response => response.data)
      .catch(error => {
        throw error.response || error;
      });
  }

  updateEquipment(equipment: any): Promise<any> {
    const url = `${this.baseUrl}Equipment`;
    return axios.put(url, equipment, { headers: this.getAuthHeaders() })
      .then(response => response.data)
      .catch(error => {
        throw error.response || error;
      });
  }

  deleteEquipment(id: number): Promise<any> {
    const url = `${this.baseUrl}Equipment/${id}`;
    return axios.delete(url, { headers: this.getAuthHeaders() })
      .then(response => response.data)
      .catch(error => {
        throw error.response || error;
      });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
