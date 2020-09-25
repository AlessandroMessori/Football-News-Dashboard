import React from 'react'
import { XYPlot, VerticalBarSeries, HorizontalBarSeries } from 'react-vis'
import './index.scss'

const Differential = props => {
  return (
    <div id='differential' className='row'>
      <div className='col-md-6'>
        <h1>Most Gained and Lost</h1>
        <XYPlot
          height={350}
          width={(document.body.clientWidth / 5) * 2}
          className='leaderboardPlot'
        >
          <HorizontalBarSeries
            onNearestX={(value, { index }) => {
              console.log(props.diffLabels[index], value)
            }}
            data={props.diffData}
          />
        </XYPlot>
      </div>
      <div className='col-md-6'>
        <h1>Newcomers</h1>
        <XYPlot
          height={350}
          width={(document.body.clientWidth / 5) * 2}
          className='leaderboardPlot'
        >
          <VerticalBarSeries
            data={props.newComersData}
            onNearestX={(value, { index }) => {
              console.log(props.newComersLabels[index], value)
            }}
          />
        </XYPlot>
      </div>
    </div>
  )
}

export default Differential
