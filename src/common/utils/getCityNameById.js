import cityData from '@constants/city'

function getCityNameById(id) {
  const allCity = []
  Object.keys(cityData).forEach((key) => {
    cityData[key].forEach((item) => {
      allCity.push(item)
    })
  })
  return allCity.find(v => v.id === id).name
}

export default getCityNameById
