import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { UserList } from './users';
import { AppList } from './apps';

const dataProvider = simpleRestProvider(process.env.REACT_APP_BACKEND_URL);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
    <Resource name="apps" list={AppList} />
  </Admin>
);

export default App;
