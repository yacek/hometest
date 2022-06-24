import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../../core/services/properties.service';
import { Property } from '../../core/models/property';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Tenant } from '../../core/models/tenant';

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
  public occupiedStats = Object.keys(Property.OccupiedStats);
  public tenantStatuses = Object.keys(Tenant.TenantStatus);
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

  constructor(private propertiesService: PropertiesService) {}

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
    console.log(this.paginator);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  doFilter() {
    console.log('filter ', this.occupiedStatusFilter, this.tenantStatusFilter);

    this.dataSource.data = this.propertiesData.filter((element) => {
      //console.log('element', element);
      return (
        (this.tenantStatusFilter != null
          ? element.tenant.tenantStatus === this.tenantStatusFilter
          : true) &&
        (this.occupiedStatusFilter != null
          ? element.occupiedStats === this.occupiedStatusFilter
          : true)
      );
    });
  }
}
