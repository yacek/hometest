import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../../core/services/properties.service';
import { Property } from '../../core/models/property';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Tenant } from '../../core/models/tenant';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../../shared/dailog/dailog.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  public occupiedStatusFilter: any;
  public tenantStatusFilter: any;
  public loadingData: boolean;
  public propertiesData: Property[];
  public dataSource: MatTableDataSource<Property>;
  public occupiedStats = Object.values(Property.OccupiedStats);
  public tenantStatuses = Object.values(Tenant.TenantStatus);
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
        //this.dataSource.data = Items;
        this.dataSource.paginator = this.paginator;
        this.loadingData = false;
        console.log(this.paginator);
        //console.log(Items);
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  doFilter() {
    this.dataSource.data = this.propertiesData.filter((element) => {
      return (
        (this.tenantStatusFilter != null
          ? element.tenant.tenantStatus === this.tenantStatusFilter
          : true) &&
        (this.occupiedStatusFilter != null
          ? this.occupiedStatusFilter === Property.OccupiedStats['Active']
            ? element.occupiedStats === Property.OccupiedStats['Occupied'] ||
              element.occupiedStats === Property.OccupiedStats['Vacant']
            : element.occupiedStats === this.occupiedStatusFilter
          : true)
      );
    });
  }

  openDialog(info: string, status: string, type: string): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '250px',
      data: { info: info, status: status, type: type },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
