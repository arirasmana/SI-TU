import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  Account as AccountView,
  SignIn as SignInView,
  Settings as SettingView,
  NotFound as NotFoundView,
  PengajuanSurat,
  Lowongan,
  MasterData,
  Pinjaman
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={Lowongan}
        exact
        layout={MainLayout}
        path="/lowongan"
      />
      <RouteWithLayout
        component={MasterData}
        exact
        layout={MainLayout}
        path="/master-data"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={PengajuanSurat}
        exact
        layout={MainLayout}
        path="/pengajuan-surat"
      />
      <RouteWithLayout
        component={Pinjaman}
        exact
        layout={MainLayout}
        path="/pinjaman"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/lainnya"
      />
      {/* <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      /> */}
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default Routes;
