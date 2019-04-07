import React, { Component } from 'react';
import cityData from '@constants/city';
import { debounce } from 'lodash';
import './CityAlphabet.scss';

class CityAlphabet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTouch: false, // 是否为触摸状态
            value: '', // 此刻触摸的字母
        };
    }

    // 选择某个字母
    handleClick = (e) => {
        this.props.onAlphabetChange(e.target.innerHTML)
    }

    // 判断开始触摸
    handleTouchStart = (e) => {
        this.setState({
            isTouch: true,
        });
    }

    // 手指移动时
    handleTouchMove = (e) => {
        const that = this;
        if (this.state.isTouch) {
            e.persist();
            debounce(() => {
                const cityAlphabetData = Object.keys(cityData);
                const toTopHeight = that.cityList.offsetTop;
                const itemHeight = that.cityList.childNodes[0].clientHeight;
                const touchDis = e.touches[0].clientY - toTopHeight;
                const index = Math.floor(touchDis / itemHeight);
                if (index > 0 && index < cityAlphabetData.length) {
                    if (cityAlphabetData[index] !== this.state.value) {
                        this.setState({
                            value: cityAlphabetData[index]
                        })
                        that.props.onAlphabetChange(cityAlphabetData[index])
                    }
                }
            }, 100)();
        }
    }
    
    // 手指移开
    handleTouchEnd = (e) => {
        this.setState({
            isTouch: false,
            value: ''
        });
    }
    render() {
        const cityAlphabetData = Object.keys(cityData);
        return (
            <ul ref={(ele) => { this.cityList = ele }} className="alphabet-list">
                <For each="item" of={cityAlphabetData} index="idx">
                    <li
                        onClick={this.handleClick}
                        onTouchStart={this.handleTouchStart}
                        onTouchMove={this.handleTouchMove}
                        onTouchEnd={this.handleTouchEnd}
                        className="alphabet-item"
                        key={idx}
                    >
                        {item}
                    </li>
                </For>
            </ul>
        );
    }
}

export default CityAlphabet;