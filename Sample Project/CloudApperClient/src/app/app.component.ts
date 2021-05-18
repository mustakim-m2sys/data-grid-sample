import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  DefaultDataGridConfiguration, EnumGridType,

  IMenuViewModel, ISchemaViewModel
} from '@CloudApperClients/app-model';
import * as SampleSchema from '../assets/Schema.json';


export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  get enumGridType() {
    return EnumGridType;
  }

  schema: ISchemaViewModel = SampleSchema.default;
  menu: IMenuViewModel = 
  {
    "Id": "5f2814c8-dce3-4f59-962e-a313eb4552e0",
    "AppId": "1d6cc0c3-350d-4490-9d64-0afed3497164",
    "ClientId": 5106148800001076,
    "ParentId": "6912e4b1-8c9b-44f0-8150-9d47114a9212",
    "Title": "Add All Control (Sample)",
    "Type": 1,
    "TypeId": "c7e72bdc-21e0-4ec5-b13a-4e6bde317307",
    "Mode": 1,
    "AppSequenceNo": 0,
    "WebSequenceNo": 1,
    "IconUrl": "https://cloudapper-icon-repo-dev.s3.amazonaws.com/default_resources/add.png?1f046456-03d7-4b3f-a772-8b5883596900?75bb2375-8bf4-4687-94f8-ed84f7c099c6",
    "FilterQuery": "",
    "SortQuery": "",
    "KanbanField": "",
    "ViewType": 1,
    "MenuViewLayout": 1
  }

  dataGridConfiguration = new DefaultDataGridConfiguration();
  

  constructor(
    
  ) {
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    // this.RegisterEvents()
  }

  O
  ngOnDestroy() {

  }

}
