import React from 'react'
import './index.scss'

export default function SVGIcon(props) {
  const {
    name,
    svgClassName,
  } = props
  return (
    <svg className={`icon icon-${name} ${svgClassName || ''}`} aria-hidden="true">
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}
