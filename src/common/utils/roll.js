// 因为移动端的点击穿透，导致单纯设置overflow=hidden无法禁止滚动，因此添加以下辅助方法
const ModalHelper = (function () {
  let scrollTop
  const originPosition = window.getComputedStyle(document.body, null).position
  return {
    // 打开modal后
    afterOpen() {
      // 记录当前滚动距离顶部的高度
      scrollTop = document.scrollingElement.scrollTop
      // 设置body属性为fixed，整个body会直接滚动到最顶端
      document.body.style.position = 'fixed'
      // 为了避免滚动到最顶端，给body设置一个top属性，值为滚动的距离；
      document.body.style.top = `${-scrollTop}px`
      // 当body的width未被撑到100%时，设置fixed属性会导致原生的宽高为自适应，因此添加一个100%；
      document.body.style.width = '100%'
    },
    // 关闭modal
    beforeClose() {
      // 将原本body的position设为初始值
      document.body.style.position = originPosition
      // 当取消position的fixed属性时，之前设置的top会失效，导致body又被滚动到最高点，这个时候，手动设置将其滚动到之前记录的位置。
      document.scrollingElement.scrollTop = scrollTop
    },
  }
}())

export const allowRoll = () => {
  ModalHelper.beforeClose()
}
export const prohibitRoll = () => {
  ModalHelper.afterOpen()
}
