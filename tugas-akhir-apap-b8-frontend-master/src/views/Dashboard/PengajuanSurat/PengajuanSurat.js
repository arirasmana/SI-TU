import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Colors } from '../../../styles'



const PengajuanSurat = (props) => (
  <ResponsiveLine
    data={props.dataState}
    margin={{ top: 50, right: 200, bottom: 80, left: 70 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 0,
      max: 'auto',
      stacked: false,
      reverse: false
    }}
    curve="natural"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 10,
      tickRotation: 0,
      legend: 'Hari',
      legendOffset: 50,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Surat',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={[
      '#4B4F86',
      '#67A4E0',
      '#8ED0F4',
      '#659898',
      '#E2EAC1',
      '#914142',
      '#E67D63',
      '#FFDEBC',
      '#D7DCFC',
      '#938FC6',
    ]}
    pointSize={10}
    pointColor={Colors.White}
    pointBorderWidth={3}
    pointBorderColor={{ from: 'serieColor', modifiers: [] }}
    pointLabel="y"
    pointLabelYOffset={10}
    enableArea={true}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
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

const LineWrapper = (props) => (
  <div style={{height: 350}}>
    <PengajuanSurat dataState={props.dataState} />
  </div>
)

export default LineWrapper
