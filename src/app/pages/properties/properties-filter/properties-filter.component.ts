import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from '../../../core/models/property';
import { Tenant } from '../../../core/models/tenant';

@Component({
  selector: 'app-properties-filter',
  templateUrl: './properties-filter.component.html',
  styleUrls: ['./properties-filter.component.css'],
})
export class PropertiesFilterComponent implements OnInit {
  @Input() propertiesData!: any;
  @Output() filterApplied = new EventEmitter<any>();

  private filteredData: any;
  public occupiedStatusFilter: string = 'all';
  public tenantStatusFilter: string = 'all';
  public occupiedStats = Object.values(Property.OccupiedStats);
  public tenantStatuses = Object.values(Tenant.TenantStatus);

  constructor() {}

  ngOnInit(): void {
    console.log();
  }

  doFilter() {
    this.filteredData = this.propertiesData.filter((element: any) => {
      return (
        (this.tenantStatusFilter !== 'all'
          ? element.tenant.tenantStatus === this.tenantStatusFilter
          : true) &&
        (this.occupiedStatusFilter !== 'all'
          ? this.occupiedStatusFilter === Property.OccupiedStats['Active']
            ? element.occupiedStats === Property.OccupiedStats['Occupied'] ||
              element.occupiedStats === Property.OccupiedStats['Vacant']
            : element.occupiedStats === this.occupiedStatusFilter
          : true)
      );
    });

    this.filterApplied.emit(this.filteredData);
  }
}
