import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-match-search',
  templateUrl: './match-search.component.html',
  styleUrls: ['./match-search.component.scss']
})
export class MatchSearchComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatchSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stateService: StateService) { }

  ngOnInit() {
    console.log(this.data);
  }


  displayName(matchName) {
    return matchName.value.MatchName;
  }

  selectMatch(gameID: string) {

    this.stateService.loadNewGame('eleague-major-2017_optic-vs-astralis_2017-01-23_21:40');
    this.stateService.loadTrajectories('eleague-major-2017_optic-vs-astralis_2017-01-23_21:40', 'de_train', 0);

  }


}
