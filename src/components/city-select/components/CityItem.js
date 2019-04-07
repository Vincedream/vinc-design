import React from 'react'
import './CityItem.scss'

const CityItem = (props) => {
  const {
    id,
    name,
  } = props.data
  return (
    <div
      onClick={() => { props.onClickCityItem(id) }}
      className="city-select-city-item"
    >
      {name}
    </div>
  )
}

export default CityItem
