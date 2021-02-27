import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  email: string;
  isloggedin: boolean;

  constructor(private http: HttpClient) {
    this.isloggedin = false;
  }

  public login(email: string, password: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/manager/login`, { email: email, password: password }, { withCredentials: true })
      .toPromise();

  }
  public getLogOut(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/manager/logout`, { withCredentials: true })
      .toPromise().then(json => {
        this.isloggedin = false;
      });
  }

  public getSessionDetailes(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/manager/session`, { withCredentials: true })
      .toPromise().then(json => {
        console.log(json);
        if (json.email) {
          this.email = json.email;
          this.isloggedin = json.is_logged_in;
        }
      });
  }


}
