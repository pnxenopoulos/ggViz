import { Component, OnInit, ViewChild } from '@angular/core';
import { Annotation } from 'src/app/model/annotation.model';
import { MatTable, MatIconRegistry } from '@angular/material';
import { StateService } from 'src/app/services/state.service';
import * as d3 from 'd3';
// import { element } from '../../../../assets/icons/done-24px.svg';
import { DomSanitizer } from '@angular/platform-browser';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-annotation-component',
  templateUrl: './annotation-component.component.html',
  styleUrls: ['./annotation-component.component.scss']
})

export class AnnotationComponentComponent implements OnInit {

  displayedColumns: string[] = ['startTime', 'endTime', 'tNumber', 'ctNumber', 'label', 'description', 'primaryTeam', 'winProbBeginning', 'winProbEnd', 'search', 'save'];

  public annotatedEvents: Annotation[] = [];

  public isEditting: boolean = false;
  public editingAnnotation: Annotation = null;
  public edditingCell: any = null;
  public edittingParamenter: string = null;

  // public annotationEdit = null;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public stateService: StateService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              public eventsService: EventsService) { 
    this.matIconRegistry.addSvgIcon('check'
    ,this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/done-24px.svg'))

    this.subscribeToEvents();
  }

  ngOnInit() { }

  loadAnnotations(annotations: Annotation[]){
    this.annotatedEvents = annotations;
  }

  subscribeToEvents(){
    this.eventsService.globalEvents.roundLoaded.subscribe(() => {

      this.annotatedEvents = this.stateService.getSelectedRound().annotations;
      console.log('ROUND LOADED');
      this.table.renderRows();
    });
  }

  addAnnotation(){  

    const annotationRange = this.stateService.getAnnotationRange();
    const winProbStart = this.stateService.getProbAtTimestep(annotationRange.local[0]);
    const winProbEnd = this.stateService.getProbAtTimestep(annotationRange.local[1]);
    const newAnnotation: Annotation = new Annotation(annotationRange.global[0], annotationRange.global[1], 2, 3, 'Insert Label', 'Insert Description', '', '', winProbStart, winProbEnd);
    this.annotatedEvents.push(newAnnotation);
    this.table.renderRows();
  }


  setEditMode(event: any, annotation: Annotation, edittingParamenter: string){

    if(this.isEditting === false && annotation.saved === false){
      
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
    this.stateService.loadSimilarMatches(annotation.id);
  }

  saveAnnotation(annotation: Annotation){
    annotation.setSaved();
    this.stateService.saveAnnotation(annotation);
  }

  primaryTeamChanged(event: any, annotation: Annotation){
    annotation.setPrimaryTeam(event.value);
  }

  tNumberChanged(event: any, annotation: Annotation){
    annotation.setTNumber(event.value);
  }

  ctNumberChanged(event: any, annotation: Annotation){ 
    annotation.setCTNumber(event.value);
  }




}
