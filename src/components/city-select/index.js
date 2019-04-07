import React, { Component } from 'react'
import CityAlphabet from './components/CityAlphabet'
import TopOption from './components/TopOption'
import SelectCityBar from './components/SelectCityBar';
import CityList from './components/CityList'
import { allowRoll, prohibitRoll } from '@utils/roll'
import './index.scss'

class CitySelect extends Component {
    state = {
        alphabetValue: '', // 当前所选中的字母
    }
    componentDidMount() {
        // 当初始visible未true时，则禁止滚动
        if(this.props.visible) {
            prohibitRoll()
        }
    }
    componentWillReceiveProps(nextProps) {
        // 当visible为false时候，则允许滚动
        if(!nextProps.visible) {
            allowRoll()
        } else {
            prohibitRoll()
        }
    }
    // 处理侧边栏字母变化
    handleAlphabetChange = (value) => {
        this.setState({
            alphabetValue: value
        })
    }
    // 关闭modal
    handleHideModal = () => {
        this.props.onClose();
    }
    // 处理选择字母
    handleSelectCity = (id) => {
        this.handleHideModal();
        this.props.onChange(id)
    }
    render() {
        const {
            alphabetValue
        } = this.state;
        const {
            visible,
            value
        } = this.props;
        return (
            <If condition={visible}>
                <div className="city-select-content">
                    <TopOption
                        onHideModal={this.handleHideModal}
                        onInputChange={this.handleSearchChange}
                        onSelectCity={this.handleSelectCity}
                    />
                    <CityAlphabet
                        onAlphabetChange={this.handleAlphabetChange}
                    />
                    <SelectCityBar
                        value={value}
                    />
                    <CityList
                        alphabetValue={alphabetValue}
                        onSelectCity={this.handleSelectCity}
                    />
                </div>
            </If>
        )
    }
}

export default CitySelect
