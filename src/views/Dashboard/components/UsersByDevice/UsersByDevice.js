import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie'
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const UsersByDevice = props => {
  const { className, dashboardData, loading, ...rest } = props;
  const [dataState, setDataState] = useState([
  {
    id: "Menunggu Persetujuan",
    label: "0",
    value: 1,
    color: "hsl(317, 70%, 50%)"
  },
  {
    id: "Disetujui",
    label: "1",
    value: 1,
    color: "hsl(239, 70%, 50%)"
  },
  {
    id: "Ditolak",
    label: "2",
    value: 1,
    color: "hsl(97, 70%, 50%)"
  },
  {
    id: "Diproses",
    label: "3",
    value: 1,
    color: "hsl(345, 70%, 50%)"
  },
  {
    id: "Selesai",
    label: "4",
    value: 1,
    color: "hsl(131, 70%, 50%)"
  }
])

  const classes = useStyles();
  const theme = useTheme();

  const PieChart = ({ dataState }) => (
    <ResponsivePie
        data={dataState}
        margin={{ top: 30, right: 80, bottom: 20, left: -100 }}
        innerRadius={0.5}
        colors={[
          '#D7DCFC',
          '#938FC6',
          '#67A4E0',
          '#8ED0F4',
          '#E2EAC1',
          // '#4B4F86',
          // '#659898',
          // '#914142',
          // '#E67D63',
          // '#FFDEBC',
        ]}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        enableRadialLabels={false}
        // radialLabel={function(e){return e.id+" ("+e.value+")"}}
        radialLabelsSkipAngle={5}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={9}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color', modifiers: [] }}
        slicesLabelsSkipAngle={0}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: -20,
          translateY: -50,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 81,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Status Surat"
      />
      <Divider />
      <div style={{ height: 240 }}>
        {loading || !dashboardData ?
          <CircularProgress color="primary" size={80} style={{ margin: 80 }} /> :
          <PieChart dataState={dataState.map(dt => Object.assign({}, {
            ...dt,
            value: dashboardData.statusList.filter(e => e[1] == parseInt(dt.label)).length > 0 ?
              dashboardData.statusList.find(e => e[1] === parseInt(dt.label))[0] : 0
          }))
          }
          />
         }
      </div>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
