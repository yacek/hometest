import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../../core/services/properties.service';
import { Property } from '../../core/models/property';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  public loadingData: boolean;
  public propertiesData: Property[];
  public dataSource: MatTableDataSource<Property>;
  public tempSelect = ['active', 'inactive'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private propertiesService: PropertiesService) {}

  displayedColumns: string[] = [
    'created',
    'address',
    'occupiedStats',
    'plan',
    'owner',
    'ownerStatus',
    'tenant',
    'tenantStatus',
  ];

  ngOnInit(): void {
    this.loadingData = true;
    this.propertiesService.getProperties().subscribe((Items) => {
      //this.propertiesData = Items;
      this.dataSource = new MatTableDataSource<Property>(Items);
      //this.dataSource.data = Items;
      this.dataSource.paginator = this.paginator;
      this.loadingData = false;
      console.log(this.paginator);
      //console.log(Items);
    });
    console.log(this.paginator);
  }

  doFilter(column: any, $event: MatSelectChange) {
    console.log('filter', column, $event.value);
  }
}
