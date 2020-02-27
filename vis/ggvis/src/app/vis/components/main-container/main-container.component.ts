import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.test();

  }


  async test() {

    this.http.get<any>('http://vidagpu.poly.edu:5000/api/games/all').subscribe(data => {
      console.log(data);

    });
  }


}
