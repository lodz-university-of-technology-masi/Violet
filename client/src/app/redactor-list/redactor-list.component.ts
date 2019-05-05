import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {RedactorModel} from '../shared/model/redactor-model';
import {RedactorService} from '../shared/services/redactor.service';
import {MessageService} from '../shared/services/message.service';

@Component({
  selector: 'app-redactor-list',
  templateUrl: './redactor-list.component.html',
  styleUrls: ['./redactor-list.component.css']
})
export class RedactorListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'delete', 'edit'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  redactors: RedactorModel[];

  constructor(private redactorService: RedactorService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.updateTable();
  }

  updateTable() {
      this.redactorService.getAll().subscribe(data => {
      this.redactors = data.sort((a, b) => a.id - b.id );
      this.dataSource = new MatTableDataSource<RedactorModel>(this.redactors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDeleteClick(redactor: RedactorModel) {
    this.redactorService.deleteRedactor(redactor.id).subscribe(() => {
      this.messageService.success('redactor_deleted');
      this.updateTable();
    });
  }
  
  onEditClick(redactor: RedactorModel) {
    this.router.navigate(['/redactor-edit'], {queryParams: {redactorId: redactor.id}});
  }
}
