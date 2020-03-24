import { Component, OnInit, ViewChild } from '@angular/core';
import { Annotation } from 'src/app/model/annotation.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-annotation-component',
  templateUrl: './annotation-component.component.html',
  styleUrls: ['./annotation-component.component.scss']
})

export class AnnotationComponentComponent implements OnInit {

  displayedColumns: string[] = ['startTime', 'endTime', 'label', 'description', 'playerName', 'teamName'];

  public annotatedEvents: Annotation[] = [];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor() { }

  ngOnInit() { }

  addAnnotation(){
    const annotation = new Annotation(Math.random(), Math.random(), 'random label', 'random description', 'Peter Xenopoulos', 'Terrorist');
    this.annotatedEvents.push(annotation);
    this.table.renderRows();
    
  }

}
