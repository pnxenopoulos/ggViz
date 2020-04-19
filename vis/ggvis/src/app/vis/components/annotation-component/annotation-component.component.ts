import { Component, OnInit, ViewChild } from '@angular/core';
import { Annotation } from 'src/app/model/annotation.model';
import { MatTable } from '@angular/material';
import { StateService } from 'src/app/services/state.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-annotation-component',
  templateUrl: './annotation-component.component.html',
  styleUrls: ['./annotation-component.component.scss']
})

export class AnnotationComponentComponent implements OnInit {

  displayedColumns: string[] = ['startTime', 'endTime', 'tNumber', 'ctNumber', 'label', 'description', 'primaryTeam', 'secondaryTeam', 'winProbBeginning', 'winProbEnd', 'actions'];

  public annotatedEvents: Annotation[] = [];

  public isEditting: boolean = false;
  public editingAnnotation: Annotation = null;
  public edditingCell: any = null;
  public edittingParamenter: string = null;

  // public annotationEdit = null;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public stateService: StateService) { }

  ngOnInit() { }

  addAnnotation(){  

    const annotationRange = this.stateService.getAnnotationRange();
    const winProbStart = this.stateService.getProbAtTimestep(annotationRange.local[0]);
    const winProbEnd = this.stateService.getProbAtTimestep(annotationRange.local[1]);
    const newAnnotation: Annotation = new Annotation(annotationRange.global[0], annotationRange.global[1], 2, 3, 'testLabel', 'testDescription', 'CT', 'T', winProbStart, winProbEnd);
    this.annotatedEvents.push(newAnnotation);
    this.table.renderRows();
  }


  setEditMode(event: any, annotation: Annotation, edittingParamenter: string){

    if(this.isEditting === false){
      
      this.isEditting = true;
      this.editingAnnotation = annotation;
      this.edditingCell = d3.select(event.target);
      this.edittingParamenter = edittingParamenter;


      this.edditingCell.html('');
      const input = this.edditingCell.append('input');
      input.on('blur', () => {
        this.editAnnotation(input.node().value);
      });
    }

  }

  editAnnotation(newValue: string){
    
    const editedValue = this.editingAnnotation.setAttribute(this.edittingParamenter, newValue);
    this.edditingCell.html(editedValue);

    this.isEditting = false;
    this.editingAnnotation = null;
    this.edditingCell = null;
    this.edittingParamenter = null;

  }


  searchSimilarEvents(annotation: Annotation){
    console.log('TODO: Search for this annotation - ', annotation);
  }




}
