import React from 'react'
import {FormControl} from 'react-bootstrap'
import './index.scss'

const SearchBar = (props) => {

  return (
    <div className='input-group search-bar'>  
      <FormControl {...props} type='text' placeholder={props.placeholder} aria-describedby='sizing-addon2'/>
    </div>)

}

export default SearchBar
