import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StateService } from 'src/app/services/state.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-match-search',
  templateUrl: './match-search.component.html',
  styleUrls: ['./match-search.component.scss']
})
export class MatchSearchComponent implements OnInit {

  displayedColumns: string[] = ['CompetitionName', 'GameDate', 'GameTime', 'MatchName'];

  constructor(
    public dialogRef: MatDialogRef<MatchSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stateService: StateService) { }

  // spinner control
  private spinnerOn: boolean = true;
  
  // list of games to choose
  private listOfGames: any = null;

  // string to filter table
  private filterString: string = '';

  ngOnInit(){
    this.stateService.getAllGamesIDs().then( data => {
      this.spinnerOn = false;
      this.listOfGames = Object.entries(data).map( element => {
        element[1]['id'] = element[0];
        return element[1];
      });
      this.listOfGames = new MatTableDataSource(this.listOfGames);
    });
  }


  filterTable() {
      this.listOfGames.filter = this.filterString.trim().toLowerCase();
  }

  selectMatch(game: string) {

    this.spinnerOn = true;
    this.stateService.loadNewGame(game).then( gameData => {
      this.spinnerOn = false;
      this.dialogRef.close();
    });


    // this.stateService.loadTrajectories('eleague-major-2017_optic-vs-astralis_2017-01-23_21:40', 'de_train', 0);

  }




}
