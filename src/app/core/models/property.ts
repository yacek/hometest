import { Deserializable } from './deserializable.model';
import { Tenant } from './tenant';
import * as dayjs from 'dayjs';

enum Plan {
  'oneRate' = 'oneRate',
  'On Demand' = 'On-Demand',
}

enum OwnerStatus {
  Active = 'active',
  Inactive = 'inactive',
}

enum OccupiedStats {
  Occupied = 'occupied',
  Vacant = 'vacant',
  Active = 'active',
  Inactive = 'inactive',
}

export class Property implements Deserializable {
  static readonly PropertyPlan = Plan;
  readonly PropertyPlan = Property.PropertyPlan;

  static readonly OccupiedStats = OccupiedStats;
  readonly OccupiedStats = Property.OccupiedStats;

  propertyId: string;
  createdOn: any;
  address: string;
  occupiedStats: OccupiedStats;
  owner: string;
  ownerStatus: OwnerStatus;
  plan: Plan;

  tenant: Tenant;

  deserialize(input: any) {
    Object.assign(this, input);
    this.tenant = new Tenant().deserialize(input.tenant);
    this.createdOn = dayjs(this.createdOn);
    return this;
  }
}
