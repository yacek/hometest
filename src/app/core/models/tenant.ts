import { Deserializable } from './deserializable.model';

export class Tenant implements Deserializable {
  contactId: string;
  firstName: string;
  lastName: string;
  tenantStatus: TenantStatus;

  getFullName(): any {
    return (
      (this.firstName != null ? this.firstName : '') +
      (this.lastName == null || this.firstName == null ? ' ' : '') +
      (this.lastName != null ? this.lastName : '')
    );
  }
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

enum TenantStatus {
  'active',
  'inactive',
}
