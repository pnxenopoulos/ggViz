import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../services/dialogs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  ngOnInit() {
  }


  openMatchSearch() {
    
    this.dialogService.openMatchSearch();

  }

}
