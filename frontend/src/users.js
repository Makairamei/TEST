import * as React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="username" />
      <TextField source="role" />
      <DateField source="lastLogin" />
      <TextField source="activeDevices" />
      <TextField source="loginLocation" />
    </Datagrid>
  </List>
);
