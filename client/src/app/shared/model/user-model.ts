export interface UserIdentity {
  email: string;
  roles: UserRole[];
}

export enum UserRole {
  guest = 'guest',
  redactor = 'redactor',
  moderator = 'moderator',
}
