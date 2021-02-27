import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  public async postNotification(title: string, description: string, buttons: string[]): Promise<any> {//,courseAppID: string
    const data = {
      title: title
      , description: description
      , buttons: buttons
    }
    const results = await this.http.post<any>(`${environment.apiUrl}/manager/notification`,
      data, { withCredentials: true }
    )
      .toPromise();
    return results;
  }
  public async getNotifications(page: string, perPage: string): Promise<any> {
    let httpParams = new HttpParams().set("page", page).set("per_page", perPage);

    const result =
      await this.http.get<any>(`${environment.apiUrl}/manager/notifications`, { withCredentials: true,params:httpParams })
        .toPromise();
    return result;
  }
}
