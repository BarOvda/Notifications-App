import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';
import { NotificationsService } from 'src/app/services/notifications.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddNotificationComponent } from '../add-notification/add-notification.component';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {
  notifications: Notification[] = [];
  page: number = 1;
  totalItems: number;
  itemsPerPage: number = 8;
  dtOptions: DataTables.Settings = {};

  constructor(public dialog: MatDialog, private service: NotificationsService, private http: HttpClient) { }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "270px"
    // dialogConfig.height = "500px"
    dialogConfig.data = {
      id: 1,
      title: 'ADD NOTIFICATION',

    };
    const dialogRef = this.dialog.open(AddNotificationComponent, dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit(): void {
    this.dtOptions = {
      data: [],
      pagingType: 'full_numbers',
      pageLength: this.itemsPerPage,
      serverSide: true,
      processing: true,
      responsive: true,
      searching: false,
      lengthChange: false,
      ordering: false,
      
    }


    this.reloadData(false);


  }
  reloadData(newNotification: boolean) {
    console.log("relod");
    var that = this;
    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
      console.log(dataTablesParameters.start);
      dataTablesParameters
      that.service.getNotifications(dataTablesParameters.start + 1, this.dtOptions.pageLength.toString()).then(resp => {
        that.notifications = resp.notifications;
        console.log(that.notifications);
        callback({
          recordsTotal: resp.total_items,
          recordsFiltered: resp.total_items,
          data: []

        });
        console.log(that.notifications);
      });
    };
  }

}
