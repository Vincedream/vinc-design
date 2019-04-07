import React, { Component } from 'react'
import BScroll from 'better-scroll'
import CityItem from './CityItem';
import hotCity from '../hotCity'
import cityData from '@constants/city.json'
import './CityList.scss'

class CityList extends Component {

  componentDidMount() {
    this.scroll = new BScroll(this.wrapper, {
      probeType: 1,
      click: true,
    })
  }

  // 当字母变化时，移动Scroll组件到对应位置
  componentWillReceiveProps(nextProps) {
      const NextAlphabetValue = nextProps.alphabetValue || ''
      const element = this.refs[NextAlphabetValue]
      this.scroll.scrollToElement(element)
  }

  // 点击城市
  handleClickCityItem = (id) => {
      this.props.onSelectCity(id)
  }

  render() {
    return (
      <div ref={(ref) => { this.wrapper = ref }} className="city-select-list">
        <div className="city-select-list-wrap">
          <div className="area">
            <div className="title">热门城市</div>
            <div className="hot-city-content">
              <For each="item" of={hotCity}>
                <span onClick={()=>{this.handleClickCityItem(item.id)}} key={item.id} className="hot-city-item">
                  {item.name}
                </span>
              </For>
            </div>
          </div>
          <For each="item" of={Object.keys(cityData)}>
            <div key={item} ref={item} className="area">
              <div className="title">{item}</div>
              <For each="city" of={cityData[item]}>
                <CityItem key={city.id} onClickCityItem={this.handleClickCityItem} data={city} />
              </For>
            </div>
          </For>
        </div>
      </div>
    )
  }
}

export default CityList
