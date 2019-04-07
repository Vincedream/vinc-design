import React from 'react'
import getCityNameById from '@utils/getCityNameById'
import SVGIcon from '@components/svg-icon'
import '@icons/address.svg'
import './SelectCityBar.scss'

const SelectCityBar = props => (
  <div className="city-select-city-bar">
    <SVGIcon name="address" />
    <span className="city">{getCityNameById(props.value)}</span>
    <span className="title">当前城市</span>
  </div>
)

export default SelectCityBar
