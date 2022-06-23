import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { map, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

declare var require: any;
let fakeData: any = require('./properties.json');

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor() {}

  test(): any {
    console.log('fakeData', fakeData);
  }

  getProperties(): Observable<Property[]> {
    //fake http call
    return of(fakeData).pipe(
      delay(1000),
      map((res) =>
        res.properties.map((property: Property) =>
          new Property().deserialize(property)
        )
      )
    );
  }
}
