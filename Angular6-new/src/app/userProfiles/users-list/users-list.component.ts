import { Component, OnInit } from '@angular/core';
//import { ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
//import { Router } from "@angular/router";
//import { map, retry } from 'rxjs/operators';
//import { MatTableDataSource } from '@angular/material';
//import { MatSort, MatPaginator } from '@angular/material';
//import { Http , Response} from '@angular/http'; 
//import { Observable } from 'rxjs/Observable';
//import {HttpClient} from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections'; 
//import { User } from '../../../../../server/models/user.model';
import { User } from '../../shared/user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

  dataSource = new UserDataSource(this.userService);
  displayedColumns = ['fullName', 'username','email','address'];
  constructor(private userService: UserService){}
  ngOnInit() {

  }

/*export class UsersListComponent implements OnInit {
}
  constructor(private userService: UserService, private _httpClient:HttpClient, private router: Router) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName'];
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.userService.getAllUsersList().subscribe(
     list => {
      let array = list.pipe(map(item => {
        map((res: any) => res.json()),
        res{

        },
        err => {

        }
        
  }));

  
  
  this.listData = new MatTableDataSource(array);
  //this.listData.sort = this.sort;
  //this.listData.paginator = this.paginator;
  this.listData.filterPredicate = (data, filter) => {
    return this.displayedColumns.some(ele => {
      return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
    });
  };
});

  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  return this.http.post(`${environment.apiPrefix}/auth/login`, credential).pipe(map((res: any) => {
    console.log('res', res);
    return res;
  }));
}*/
}
export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService){
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getAllUsersList();
  }
  disconnect(){}
}
