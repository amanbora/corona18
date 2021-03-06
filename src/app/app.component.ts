import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { Router, NavigationEnd } from '@angular/router';
import { CollegeService } from './shared/services/college.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'corona18';
  @ViewChild('appModalHolder', { read: ViewContainerRef }) modalHolder;
  @ViewChild('appSnackbarHolder', { read: ViewContainerRef }) snackbarHolder;
  constructor(private modalService: ModalService, private router: Router, private collegeService: CollegeService) {
    modalService.createNewModalWithData.subscribe(data => {
      if (data) {
        modalService.createModal(this.modalHolder, data);
      }
    });
    modalService.createNewSnackbarWithData.subscribe(data => {
      if (data) {
        modalService.createSnackBar(this.snackbarHolder, data);
      }
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  if(!localStorage.getItem('events'))
  this.collegeService.setEventDataLocally();
  }

}
