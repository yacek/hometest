import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../core/services/properties.service';
import { Property } from '../../core/models/property';
// import {MatPaginator, MatSort} from '@angular/material/table';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  constructor(private propertiesService: PropertiesService) {}

  public loadingData: boolean;
  public propertiesData: Property[];
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
    this.propertiesService.getProperties().subscribe((timedItem) => {
      this.propertiesData = timedItem;
      this.loadingData = false;
      console.log(timedItem);
    });
  }
}
