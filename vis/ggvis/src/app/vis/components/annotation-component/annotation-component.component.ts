import { Component, OnInit, ViewChild } from '@angular/core';
import { Annotation } from 'src/app/model/annotation.model';
import { MatTable } from '@angular/material';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-annotation-component',
  templateUrl: './annotation-component.component.html',
  styleUrls: ['./annotation-component.component.scss']
})

export class AnnotationComponentComponent implements OnInit {

  displayedColumns: string[] = ['startTime', 'endTime', 'tNumber', 'ctNumber', 'label', 'description', 'primaryTeam', 'secondaryTeam', 'winProbBeginning', 'winProbEnd'];

  public annotatedEvents: Annotation[] = [];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public stateService: StateService) { }

  ngOnInit() { }

  addAnnotation(){  

    const annotationRange = this.stateService.getAnnotationRange();
    const newAnnotation: Annotation = new Annotation(annotationRange[0], annotationRange[1], 2, 3, 'testLabel', 'testDescription', 'CT', 'T', 0.5, 0.3);
    this.annotatedEvents.push(newAnnotation);
    this.table.renderRows();
  }

}
