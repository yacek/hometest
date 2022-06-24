import { Deserializable } from './deserializable.model';

enum TenantStatus {
  'active' = 'active',
  'inactive' = 'inactive',
}

export class Tenant implements Deserializable {
  static readonly TenantStatus = TenantStatus;
  readonly TenantStatus = Tenant.TenantStatus;

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
