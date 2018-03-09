<template>
  <div>
    <h1 class="color-title">中国色</h1>
    <div class="left">
      <div class="items" v-for="item,index in colorList" @click="showColor(item,index)">
        <div class="left-list-top">
          <h2 :style="{color: item.hex}">{{item.name}}</h2>
          <span :style="{color: item.hex,borderBottomColor:item.hex}">{{item.hex}}</span>
        </div>
        <div class="item-progress">
          <div class="progress-bar">
            <div class="progress" :style="{background:item.hex,left: percentage(RP[index])}"></div>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{background:item.hex,left: percentage(GP[index])}"></div>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{background:item.hex,left: percentage(BP[index])}"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="right" :style="{background:bgColor}">
      <h2 class="right-head">CHINESE COLOR</h2>
      <p class="right-tip">点击颜色可显示显示信息哦</p>
      <p class="color-name1">{{name1}}</p>
      <p class="color-name2">{{name2}}</p>
      <div class="rgb-item">
        <div class="rgb-a"><span class="r-top">R</span><span class="r-bottom">{{rP}}</span></div>
        <div class="rgb-g"><span class="r-top">G</span><span class="r-bottom">{{gP}}</span></div>
        <div class="rgb-b"><span class="r-top">B</span><span class="r-bottom">{{bP}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        colorList: [],
        RP: [],
        GP: [],
        BP: [],
        name1: null,
        name2: null,
        rP: 0,
        gP: 0,
        bP: 0,
        bgColor: null
      }
    },
    created () {
      this.getColor()
    },
    methods: {
      getColor () {
        this.axios.get('/src/js/color.json').then((res) => {
          if (res.status === 200) {
            this.colorList = res.data
            for (let i = 0; i < res.data.length; i++) {
              this.RP.push(res.data[i].RGB[0])
              this.GP.push(res.data[i].RGB[1])
              this.BP.push(res.data[i].RGB[2])
            }
          }
        })
      },
      percentage (value) {
        if (value / 255 == 1) {
          return 0
        } else {
          return -(100 - (value / 255) * 100) + '%'
        }
      },
      showColor (item, index) {
        this.name1 = item.name
        this.name2 = item.pinyin
        this.bgColor = item.hex
        this.rP = this.RP[index]
        this.gP = this.GP[index]
        this.bP = this.BP[index]
      },
      countUp (elem, endVal, startVal, duration) {
        // 传入参数依次为 数字要变化的元素，最终显示数字，数字变化开始值，变化持续时间
        let startTime = 0
        let progress, value
        function startCount (timestamp) {
          if (!startTime) startTime = timestamp
          progress = timestamp - startTime
          value = startVal + (endVal - startVal) * (progress / duration)
          value = (value > endVal) ? endVal : value
          progress < duration && requestAnimationFrame(startCount)
        }
        requestAnimationFrame(startCount)
      }
    }
  }
</script>

<style scoped lang="sass">
  .color-title
    width: 100%
    font-size: 16px
    position: fixed
    top: 0
    background: #f2f4f6
    padding: 10px 0
    margin: 0
    z-index: 900
  .left
    width: 60%
    height: 100%
    margin-top: 51px
    .items
      width: 90%
      height: 70px
      border-bottom: 1px solid
      margin-left: 5%

    .left-list-top
      display: flex
      flex-flow: row
      align-items: center
      justify-content: space-between
      margin-top: 5px
      h2
        font-size: 14px
        text-align: left
        margin: 0 30px 0 15px
      span
        font-size: 14px
        border-bottom: 1px solid #000
        margin-right: 15px

  .item-progress
      display: flex
      flex-direction: column
      margin-top: 10px
      .progress-bar
        height: 8px
        width: 90%
        border-radius: 2px
        background: #efefef
        position: relative
        margin-bottom: 5px
        overflow: hidden

  .progress
    position: absolute
    height: 100%
    top: 0
    width: 100%
    left: -100%

  .right
    position: fixed
    width: 38%
    height: 100%
    right: 3%
    top: 40px
  .right-head
    font-size: 18px
  .right-tip
    font-size: 14px
    padding: 0 5px
  .rgb-item
    width: 100%
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center
  .color-name1, .color-name2
    font-size: 16px
    color: #fff
  .rgb-a, .rgb-g, .rgb-b
    width: 50px
    height: 50px
    border-bottom: 1px solid #fff
    position: relative
  .r-top
    font-size: 14px
    position: absolute
    top: 5px
    left: 5px
    color: #f0f0f0
  .r-bottom
    font-size: 16px
    position: absolute
    bottom: 5px
    left: 50%
    transform: translateX(-50%)
    color: #f0f0f0
</style>
