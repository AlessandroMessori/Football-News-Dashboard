import React from 'react'
import { connect } from 'react-redux'
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'
import { loadCurrentTopicData } from '../../actions'
import { location, lastDate, currentTopic } from '../../selectors'
import Spinner from '../../components/Spinner'
import DataCard from '../../components/DataCard'
import './index.scss'

const mapDispatchToProps = dispatch => ({
  loadCurrentTopicData: name => dispatch(loadCurrentTopicData(name))
})

const mapStateToProps = state => ({
  location: location(state),
  lastDate: lastDate(state),
  currentTopic: currentTopic(state)
})

class TopicPage extends React.Component {
  componentDidMount () {
    this.props.loadCurrentTopicData(this.props.location)
  }

  getTopicCounts () {
    const countItem = {}

    this.props.currentTopic.counts.forEach(({ _id, count }) => {
      countItem[_id] = count
    })

    return countItem
  }

  render () {
    const { currentTopic } = this.props
    const { counts } = currentTopic
    const countsVals = counts.map(item => item.count)

    const totalCounts = counts.reduce((acc, val) => acc + val.count, 0)
    const countAvg = Math.round((totalCounts / counts.length) * 10) / 10
    const maxCount = Math.max(...countsVals)
    const minCount = Math.min(...countsVals)

    console.log(
      currentTopic.counts.map(({ _id, count }) => {
        const countItem = {}
        countItem[_id] = count
        return countItem
      })
    )

    return (
      <section id='topicPage'>
        <h1 id='mainTitle'>{this.props.location}</h1>
        {counts.length > 0 && (
          <h2 id='mainSubTitle'>
            (Last Update {this.props.lastDate} 22:00 CET)
          </h2>
        )}

        {counts.length === 0 && <Spinner />}
        {counts.length > 0 && (
          <div>
            <div id='stats' className='row'>
              <div className='col-md-1' />
              <DataCard name='Total Counts' count={totalCounts} size='2' />
              <DataCard name='Number of Days' count={counts.length} size='2' />
              <DataCard name='Average Count' count={countAvg} size='2' />
              <DataCard name='Max Count' count={maxCount} size='2' />
              <DataCard name='Min Count' count={minCount} size='2' />
            </div>
            <div id='dataRow' className='row'>
              <div id='countPlot' className='col-md-6'>
                <h2>Counts </h2>
                <LineChart data={this.getTopicCounts()} />
              </div>
              <div id='countPlot2' className='col-md-6'>
                <h2>Language Distribution </h2>
                <PieChart
                  data={[
                    ['Italian', 44],
                    ['English', 23]
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage)
