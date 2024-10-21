import { Component, Input, OnInit } from '@angular/core';
import { IProgram, IProgramRequest } from '../../shared/contracts/models';
import { DESCRIPTION } from '../../shared/contracts/statics';
import { ProgramsService } from '../../shared/services/programs.service';

@Component({
  selector: 'app-programs-grid',
  templateUrl: './programs-grid.component.html',
  styleUrls: ['./programs-grid.component.scss'],
})
export class ProgramsGridComponent implements OnInit {
  description: string = DESCRIPTION;

  @Input() program: IProgram | undefined;
  showShortDesciption = true;

  constructor(private programsService: ProgramsService) {}

  ngOnInit() {}

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  handleLike() {
    if (this.program) {
      this.program.likes += 1;
  
      const request: IProgramRequest = {
        likes: 1,
        dislikes: 0
      };

      this.programsService.updateLikesAndDislikes(this.program.uid, request).subscribe();
    }
  }
  
  handleDislike() {
    if (this.program) {
      this.program.dislikes += 1;
  
      const request: IProgramRequest = {
        likes: 0,
        dislikes: 1
      };

      this.programsService.updateLikesAndDislikes(this.program.uid, request).subscribe();
    }
  }
}
