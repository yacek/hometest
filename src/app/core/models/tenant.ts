import { Deserializable } from './deserializable.model';

export class Tenant implements Deserializable {
  contactId: string;
  firstName: number;
  lastName: string;
  tenantStatus: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
