import * as React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const AppList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="description" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
