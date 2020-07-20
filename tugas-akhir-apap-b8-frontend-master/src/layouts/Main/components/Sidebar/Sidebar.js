import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Work';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import StorageIcon from '@material-ui/icons/Storage';
import ReorderIcon from '@material-ui/icons/Reorder';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { Profile, SidebarNav, UpgradePlan } from './components';
import { withCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, allCookies, ...rest } = props;


  const classes = useStyles();

  const pages = allCookies.user.id_role === 2 ? [
    {
      title: 'Home',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'User',
      href: '/users',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Master Data',
      href: '/master-data',
      icon: <StorageIcon />
    },
    {
      title: 'Pengajuan Surat',
      href: '/pengajuan-surat',
      icon: <EmailIcon />
    },
    {
      title: 'Lowongan',
      href: '/lowongan',
      icon: <WorkIcon />
    },
    {
      title: 'Pinjaman',
      href: '/pinjaman',
      icon: <AccountBalanceWalletIcon />
    }
  ] : [
    {
      title: 'Home',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Pengajuan Surat',
      href: '/pengajuan-surat',
      icon: <EmailIcon />
    },
    {
      title: 'Pinjaman',
      href: '/pinjaman',
      icon: <AccountBalanceWalletIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        <UpgradePlan />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default withCookies(Sidebar);
