import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { DataSource } from '@angular/cdk/collections'; 
import { User } from '../../shared/user.model';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import {MatSort, MatTableDataSource, MatSortable, MatPaginator} from '@angular/material';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  
  displayedColumns = ['fullName', 'username','email','address'];
  
  constructor(private userService: UserService){}
ngOnInit(){
  this.userService.getAllUsersList().subscribe(results => {
    if(!results){
      return;
    }
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  })
  
}
  
}

 /*export class UserDataSource extends DataSource<any> {
  
  constructor(private userService: UserService){
    super();
    }
  connect(): Observable<User[]> {
return this.userService.getAllUsersList();
 }
  disconnect(){}
  
}*/




