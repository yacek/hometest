import { Deserializable } from './deserializable.model';
import { Tenant } from './tenant';

export class Property implements Deserializable {
  propertyId: string;
  createdOn: string;
  address: string;
  occupiedStats: string;
  owner: string;
  ownerStatus: string;
  plan: string;

  tenant: Tenant;

  deserialize(input: any) {
    Object.assign(this, input);
    this.tenant = new Tenant().deserialize(input.tenant);
    return this;
  }
}
