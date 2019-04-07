import React, { Component } from 'react'
import SVGIcon from '@components/svg-icon'
import CityItem from './CityItem'
import "@icons/address.svg"
import "@icons/app-back.svg"
import "@icons/search.svg"
import './TopOption.scss'
import cityData from '@constants/city.json'

const allCity = [];

Object.keys(cityData).forEach(key => {
    cityData[key].forEach(item => {
        allCity.push(item)
    })
})

class TopOption extends Component {
    state = {
        searchList: [],
        query: ''
    }
    handleInputChange = (e) => {
        this.setState({
            query: e.target.value
        })
        this.filterCity(e.target.value)
    }
    filterCity = (value) => {
        if (!value) return;
        let targetList = allCity.filter(v => {
            return (v.name).indexOf(value) !== -1 || (v.spell).indexOf(value) !== -1
        })
        this.setState({
            searchList: targetList
        })
    }
    handleClickCityItem = (id) => {
        this.props.onSelectCity(id)
    }
    handleCleanQuery = () => {
        this.setState({
            query: ''
        })
    }
    render() {
        const {
            searchList,
            query
        } = this.state;
        return (
            <div className="city-select-top-options">
                <div className="option-content">
                    <span onClick={this.props.onHideModal} className="back">
                        <SVGIcon name="app-back" />
                    </span>
                    <span className="input">
                        <SVGIcon name="search" />
                        <input value={query} onChange={this.handleInputChange} type="text" />
                    </span>
                </div>
                <If condition={query !== ''}>
                    <div className="search-bar">
                        <Choose>
                            <When condition={searchList.length !== 0}>
                                <div>
                                    <For each="item" of={searchList} >
                                        <CityItem onClickCityItem={this.handleClickCityItem} data={item} />
                                    </For>
                                </div>
                            </When>
                            <Otherwise>
                                <div className="no-result">没有相关城市</div>
                            </Otherwise>
                        </Choose>
                    </div>
                    <div onClick={this.handleCleanQuery} className="mask"></div>
                </If>
            </div>
        )
    }
}

export default TopOption
