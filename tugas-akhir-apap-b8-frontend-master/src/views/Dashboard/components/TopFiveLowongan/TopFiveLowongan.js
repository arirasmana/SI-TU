import _ from 'lodash'
import clsx from 'clsx';
import useAxios from "axios-hooks";
import PropTypes from 'prop-types';
import { BACKEND, getAxios } from 'utils';
import { withCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Card,
  CardHeader,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Divider,
} from '@material-ui/core';
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const SpinnerCard = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 200px;
  width: auto;
`



const UsersByDevice = props => {
  const { className, allCookies, ...rest } = props;
  const [dataState, setDataState] = useState(null)

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    getAxios(BACKEND.GET_ALL_LOWONGAN, allCookies.user.jwttoken)
  );

  useEffect(() => {
    if (getData) {
      const sortedData = _.orderBy(getData, ['jumlah'], ['desc']).slice(0, 5);
      setDataState(sortedData)
    }
  }, [getData])
  
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Top 5 Lowongan"
      />
      <Divider />
      <div style={{height: 220}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Lowongan</TableCell>
              <TableCell>Jumlah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!dataState ? 
            <TableRow>
                <TableCell colSpan={9} rowSpan={10} padding="checkbox">
                  <SpinnerCard>
                    <CircularProgress size={80}/>
                  </SpinnerCard>
              </TableCell>
            </TableRow>
            : dataState.map((data, index) => 
              <TableRow
                className={classes.tableRow}
                hover
                key={index + 1}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.judul}</TableCell>
                <TableCell>{data.jumlah}</TableCell>
              </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default withCookies(UsersByDevice);
