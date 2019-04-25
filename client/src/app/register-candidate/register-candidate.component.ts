import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CandidateService} from '../shared/services/candidate.service';
import {Language, RecruitmentPosition, RegisterCandidate, TestVersionEntry} from '../shared/model/candidate-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.css']
})
export class RegisterCandidateComponent implements OnInit {

  language: Language[];

  position: RecruitmentPosition[];

  availableTests: TestVersionEntry[];

  testTableVisible: Boolean = false;

  userDetailsVisible: Boolean = false;

  chosenTestVersionId: number = null;

  registerCandidate: RegisterCandidate = {
    firstName: '',
    lastName: '',
    email: '',
    languageId: 1,
    positionId: 1
  };

  displayedColumns: string[] = ['id', 'name', 'choose'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private candidateService: CandidateService) {
  }

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.candidateService.getAllLanguages().subscribe(data => {
      this.language = data;
      this.registerCandidate.languageId = this.language[0].id;
    });
    this.candidateService.getAllPositions().subscribe(data => {
      this.position = data;
      this.registerCandidate.positionId = this.position[0].id;
    });
  }

  findTests() {
    this.candidateService.getTestVersionList(this.registerCandidate.positionId, this.registerCandidate.languageId).subscribe(data => {
      this.availableTests = data.sort((a, b) => a.id - b.id);
      this.dataSource = new MatTableDataSource<TestVersionEntry>(this.availableTests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.testTableVisible = true;
    });
  }

  chooseTest(id: number) {
    this.chosenTestVersionId = id;
    this.userDetailsVisible = true;
  }

  startTest() {
    this.candidateService.registerCandidate(this.registerCandidate).subscribe(data => {
      this.router.navigate(['/resolve-test'], {queryParams: {testVersionId: this.chosenTestVersionId, token: data.token}});
    });
  }

}
