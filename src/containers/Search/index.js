import React from 'react'
import { connect } from 'react-redux'
import { filterChange, clearFilters, searchTopics } from '../../actions'
import { topics, filters } from '../../selectors'
import SearchBar from '../../components/SearchBar'
import Spinner from '../../components/Spinner'
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
  constructor (props) {
    super(props)
    this.timeout = 0
    this.search = this.search.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.filters !== nextProps.filters) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.props.searchTopics(nextProps.filters)
      }, 300)
    }
  }

  search (e, property) {
    const val = e.target.value
    this.props.filterChange(val, property)
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
            onChange={event => {
              console.log(event.target)
              this.search(event, 'name')
            }}
          />
          <SearchBar
            id='searchBar2'
            value={this.props.filters.category}
            placeholder='Search By Category'
            onChange={event => this.search(event, 'category')}
          />
        </div>
        <div id='resultsSection' className='row'>
          {this.props.topics.length === 0 && <Spinner />}
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
