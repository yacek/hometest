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
  public occupiedStats = Object.keys(Property.OccupiedStats);
  public tenantStatuses = Object.keys(Tenant.TenantStatus);

  constructor() {}

  ngOnInit(): void {}

  doFilter() {
    this.filteredData = this.propertiesData.filter((element: any) => {
      return (
        (this.tenantStatusFilter !== 'all'
          ? element.tenant.tenantStatus === this.tenantStatusFilter
          : true) &&
        (this.occupiedStatusFilter !== 'all'
          ? this.occupiedStatusFilter === Property.OccupiedStats['active']
            ? element.occupiedStats === Property.OccupiedStats['occupied'] ||
              element.occupiedStats === Property.OccupiedStats['vacant']
            : element.occupiedStats === this.occupiedStatusFilter
          : true)
      );
    });

    this.filterApplied.emit(this.filteredData);
  }
}
