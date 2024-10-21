import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../shared/services/programs.service';
import { IProgram } from '../../shared/contracts/models';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
  listPrograms: Array<IProgram> = [];
  isLoading: boolean = true;

  constructor(private programsService: ProgramsService) {}

  ngOnInit() {
    this.programsService.getPrograms().subscribe((response) => {
      if (response && response.$values) {
        this.listPrograms = response.$values;
        this.isLoading = false;
      }
    })
  }
}
