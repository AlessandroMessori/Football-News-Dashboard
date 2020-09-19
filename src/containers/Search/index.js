import React from 'react'
import { connect } from 'react-redux'
import { filterChange, clearFilters, searchTopics } from '../../actions'
import { topics, filters } from '../../selectors'
import SearchBar from '../../components/SearchBar'
import DataCard from '../../components/DataCard'
import './index.scss'

const mapDispatchToProps = dispatch => ({
  filterChange: (value, source) => dispatch(filterChange(value, source)),
  clearFilters: () => dispatch(clearFilters()),
  searchTopics: (name, category) => dispatch(searchTopics(name, category))
})
const mapStateToProps = state => ({
  topics: topics(state),
  filters: filters(state)
})

class SearchPage extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.filters !== nextProps.filters) {
      console.log(nextProps.filters)
      this.props.searchTopics(nextProps.filters)
    }
  }

  render () {
    return (
      <section id='searchPage'>
        <h1> Search Page</h1>
        <div id='searchSection'>
          <SearchBar
            id='searchBar1'
            value={this.props.filters.name}
            placeholder='Search By Name'
            onChange={event =>
              this.props.filterChange(event.target.value, 'name')
            }
          />
          <SearchBar
            id='searchBar2'
            value={this.props.filters.category}
            placeholder='Search By Category'
            onChange={event =>
              this.props.filterChange(event.target.value, 'category')
            }
          />
        </div>
        <div id='resultsSection' className='row'>
          {this.props.topics.map(topic => (
            <DataCard
              key={topic._id}
              className='resultCard'
              name={topic.name}
              count={topic.category}
              size='4'
            />
          ))}
        </div>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
