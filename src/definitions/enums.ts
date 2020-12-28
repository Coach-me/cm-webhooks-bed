import { registerEnumType } from 'type-graphql';

export enum AuthType {
  FB = 'Facebook',
  GO = 'Google',
}
registerEnumType(AuthType, {
  name: 'AuthType', // this one is mandatory
  description: 'Authentication type', // this one is optional
});

export enum TypeAccount {
  NE = 'Nequi',
  BCOL = 'bancolombia',
}
registerEnumType(TypeAccount, {
  name: 'TypeAccount', // this one is mandatory
  description: 'Account type', // this one is optional
});

export enum UserType {
  CO = 'Coach',
  US = 'Usuario',
}
registerEnumType(UserType, {
  name: 'UserType', // this one is mandatory
  description: 'User type', // this one is optional
});

export enum MessageType {
  ER = 'error',
  WA = 'warning',
}
registerEnumType(MessageType, {
  name: 'MessageType', // this one is mandatory
  description: 'Message type', // this one is optional
});
