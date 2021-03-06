import React from 'react'
import { connect } from 'react-redux'
import {
  data,
  mostCountedTopics,
  lastDate,
  mostGained,
  newComers
} from '../../selectors'
import Spinner from '../../components/Spinner'
import DataCard from '../../components/DataCard'
import Leaderboard from '../../components/Leaderboard'
import Differential from '../../components/Differential'
import './index.scss'

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  data: data(state),
  mostCountedTopics: mostCountedTopics(state),
  mostGainedTopics: mostGained(state),
  lastDate: lastDate(state),
  newComers: newComers(state)
})

class HomePage extends React.Component {
  render () {
    console.log(this.props.newComers)
    return (
      <section id='homePage'>
        <h1 id='mainTitle'>Football Topics DataVIZ</h1>
        {this.props.data.length > 0 && (
          <h2 id='mainSubTitle'>
            (Last Update {this.props.lastDate} 22:00 CET)
          </h2>
        )}

        {!this.props.mostCountedTopics && <Spinner />}

        {this.props.mostCountedTopics && (
          <div>
            <h1>Today's Top 5 Trending Topics</h1>
            <div id='top5' className='row'>
              <div className='col-md-1' />
              {this.props.mostCountedTopics.slice(0, 5).map(topic => (
                <DataCard
                  key={topic.name}
                  name={topic.name}
                  count={topic.count}
                  size='2'
                  percentage='+20%'
                />
              ))}
            </div>
          </div>
        )}
        {this.props.mostCountedTopics && (
          <Leaderboard
            data={this.props.mostCountedTopics
              .slice(0, 20)
              .map((topic, i) => [topic.name, topic.count])}
          />
        )}
        {this.props.mostCountedTopics && (
          <Differential
            newComersData={this.props.newComers.map(({ name, count }) => [
              name,
              count
            ])}
            diffData={this.props.mostGainedTopics.map(({ name, delta }) => [
              name,
              delta
            ])}
            diffLabels={this.props.mostGainedTopics.map(item => item.name)}
          />
        )}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
