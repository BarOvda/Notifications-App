import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {

  title: string;
  @ViewChild('formDirective') private formDirective: NgForm;


  notificationForm = this.fb.group({
    title: ['', {
      validators: [Validators.required],
      updateOn: 'blur'
    }

    ],
    description: ['', Validators.required],
    buttons: this.fb.array([

    ])
  });

  constructor(
    private service: NotificationsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNotificationComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
  }
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
  ngOnInit() {

  }
  onSubmit() {
    const title = this.notificationForm.get('title').value;
    const description = this.notificationForm.get('description').value;
    const buttons = this.notificationForm.get('buttons').value;
    this.service.postNotification(title, description, buttons).then(json => {

      this._snackBar.open("The Notification Added Successfuly!",
        "close", {
        duration: 2000
      });
      this.formDirective.resetForm();

    });
  }

  close() {
    this.dialogRef.close();
  }

  get buttons() {
    return this.notificationForm.get('buttons') as FormArray;
  }

  removeButtons() {
    const index= this.buttons.length-1;
    this.buttons.removeAt(index);

    Object.keys(this.notificationForm.controls).forEach(key => {
      this.notificationForm.get(key).setErrors(null);
    });
  }
  addButtons() {

    this.buttons.push(this.fb.control(''));
    Object.keys(this.notificationForm.controls).forEach(key => {
      this.notificationForm.get(key).setErrors(null);
    });
  }
 
  isFormValid() {
    let valid = true;
    const title = this.notificationForm.get('title').value;
    const des = this.notificationForm.get('description').value;
    const buttons = this.notificationForm.get('buttons').value;
    buttons.forEach(element => {
      if (element === '')
        valid = false;
    });
    if (!this.notificationForm.valid || title === '' || des === '')
      valid = false;
    return valid;
  }

  isMaxButtons() {
    if (this.buttons.length > 1)
      return true;
    return false;
  }
  isMinButtons() {
    if (this.buttons.length <= 0)
      return true;
    return false;
  }
}
