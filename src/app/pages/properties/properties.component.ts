import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../../core/services/properties.service';
import { Property } from '../../core/models/property';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../../shared/dailog/dailog.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public loadingData: boolean;
  public propertiesData: Property[];
  public dataSource: MatTableDataSource<Property>;

  private dataSubscription: Subscription;
  public displayedColumns: string[] = [
    'created',
    'address',
    'occupiedStats',
    'plan',
    'owner',
    'ownerStatus',
    'tenant',
    'tenantStatus',
  ];

  constructor(
    private propertiesService: PropertiesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadingData = true;
    this.dataSubscription = this.propertiesService
      .getProperties()
      .subscribe((Items) => {
        this.propertiesData = Items;
        this.dataSource = new MatTableDataSource<Property>(Items);
        this.dataSource.paginator = this.paginator;
        this.loadingData = false;
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  onFilterApplied(dataSet: any): void {
    this.dataSource.data = dataSet;
  }

  openDialog(info: string, status: string, type: string): void {
    this.dialog.open(DailogComponent, {
      width: '250px',
      data: { info: info, status: status, type: type },
    });
  }
}
