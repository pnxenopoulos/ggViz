import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, _MatTabGroupBase } from '@angular/material';
import { MatchSearchComponent } from '../vis/components/dialogs/match-search/match-search.component';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})

export class DialogService {

    private currentDialog: MatDialogRef<any, any>;

    constructor(public dialog: MatDialog, public stateService: StateService) {}


    openMatchSearch() {

        this.stateService.getAllGamesIDs().then( observable => {
            observable.subscribe( data => {

                this.currentDialog = this.dialog.open( MatchSearchComponent, {
                    data,
                    width: '350px',
                    height: '350px'
                });

                this.currentDialog.afterClosed().subscribe( result => {
                    this.currentDialog = null;
                });
            });
        });
    }


}

