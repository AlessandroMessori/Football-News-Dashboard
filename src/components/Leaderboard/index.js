import React from 'react'
import {
  XYPlot,
  VerticalBarSeries,
  Crosshair
} from 'react-vis'
import './index.scss'

const DATA = [
  [
    { x: 1, y: 10 },
    { x: 2, y: 7 },
    { x: 3, y: 15 }
  ],
  [
    { x: 1, y: 20 },
    { x: 2, y: 5 },
    { x: 3, y: 15 }
  ]
]

class Leaderboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      crosshairValues: []
    }
    this.render = this.render.bind(this)
  }

  render () {
    return (
      <div id='leaderBoard' className='row'>
        <div className='col-md-6'>
          <h1>Leaderboard</h1>
          <XYPlot
            height={350}
            width={(document.body.clientWidth / 5) * 2}
            className='leaderboardPlot'
          >
            <VerticalBarSeries
              data={this.props.data}
              onNearestX={(value, { index }) => {
                console.log(this.props.labels[index], value)
                this.setState({
                  crosshairValues: DATA.map(d => d[index])
                })
              }}
            />
            <Crosshair values={this.state.crosshairValues} />
          </XYPlot>
        </div>
        <div className='col-md-6'>
          <h1>General Statistics</h1>
          <div className='counterCard row'>
            <h2 className='cardItem col-md-6'>10000 Words Analyzed</h2>
            <h2 className='cardItem col-md-6'>2200 Topics Counted</h2>
            <h2 className='cardItem col-md-6'>11 Websites Scraped</h2>
            <h2 className='cardItem col-md-6'>2 Languages</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Leaderboard
