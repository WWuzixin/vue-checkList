<template>
    <div class="cl-wrap" :class="{'show':isOpen}">
        <div class="topbar">
            <span class="cancel" @click="cancel()">取消</span>
            <span class="title">选择考场</span>
            <span class="confirm" @click="confirm()">确定</span>
        </div>
        <div class="desc">已选中{{checkboxValue.length}}个，最多可选{{max}}个</div>
        <div class="list" ref="list">
            <div class="line-wrap" v-for="(item, index) in dataList" :data-val="item.value + '|' + item.label">
                <label :for="index" class="line">
                    <div class="left">
                        <div class="title">{{item.label}}</div>
                        <div class="address" v-if="item.address">{{item.address}}</div>
                    </div>
                    <div class="right"></div>
                </label>
                <input type="checkbox" :id="index" v-model="checkboxValue" @click="selected($event)" style="display: none" :value="item.value + '|' + item.label">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        checkboxValue: [],
        isOpen: false
      }
    },
    props: {
      max: {
        type: Number,
        default: 0
      },
      dataList: {
        type: Array,
        default: []
      }
    },
    watch: {
      checkboxValue (val, oldval) {
        const lines = document.getElementsByClassName('line-wrap')
        if (val.length === 3) {
          for (let i = 0; i < lines.length; i++) {
            if (!lines[i].children[0].classList.contains('selected')) {
              lines[i].children[0].classList.add('disabled')
              lines[i].children[1].setAttribute('disabled', 'disabled')
            }
          }
        } else {
          for (let i = 0; i < lines.length; i++) {
            lines[i].children[0].classList.remove('disabled')
            lines[i].children[1].removeAttribute('disabled')
          }
        }
      },
      deep: true
    },
    methods: {
      selected (event) {
        const classList = event.target.previousElementSibling.classList
        classList.contains('selected') ? classList.remove('selected') : classList.add('selected')
      },
      show () {
        document.activeElement.blur()
        this.isOpen = true
      },
      hide () {
        this.isOpen = false
      },
      cancel () {
        this.isOpen = false
      },
      confirm () {
        this.isOpen = false
        const checkboxValue = this.checkboxValue
        const res = []
        for (let i = 0; i < checkboxValue.length; i++) {
          const resObj = {}
          const item = checkboxValue[i].split('|')
          resObj.value = item[0]
          resObj.label = item[1]
          res.push(resObj)
        }
        this.$emit('on-change', res)
      }
    }
  }
</script>

<style scoped>
    .cl-wrap{
        overflow: hidden;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        -webkit-transition: all .5s;
        transition: all .5s;
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
    }
    .cl-wrap.show{
        -webkit-transform: translateY(0%);
        transform: translateY(0%);
    }
    .topbar {
        height: .45rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .16rem;padding: 0 .13rem;
        border-bottom: .005rem solid rgb(217,217,217);
    }
    .topbar .cancel {
        color: rgb(159,159,159);
    }
    .topbar .title {
        color: rgb(0,0,0);
    }
    .topbar .confirm {
        color: rgb(46,166,242);
    }
    .desc {
        height: .15rem;
        line-height: .15rem;
        padding: .1rem;
        font-size: .14rem;
        text-align: right;
        color: rgb(159,159,159);
    }
    .list {
        max-height: 3rem;
        overflow-y: scroll;
        overflow-scrolling: touch;
    }
    .list .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 .15rem;
        border-bottom: .005rem solid rgb(217,217,217);
        padding: .1rem 0;
    }
    .list .line.disabled .left .title {
        color: #9e9e9e;
    }
    .list .left .title {
        font-size: .16rem;
        color: #000;
        text-align: left;
    }
    .list .left .address {
        font-size: .16rem;
        color: rgb(159,159,159);
        position: relative;
        padding-left: .15rem;
    }
    .list .left .address::before {
        content: ' ';
        display: inline-block;
        position: absolute;
        width: .15rem;
        height: .15rem;
        top: .04rem;
        left: .02rem;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAABu0lEQVRIiaXUzU8TQRjH8U9fpAkXIZqItHghxEgietuD/gP84R420QSDcCDxIq6KaCoJYCuaeJhdu93OlILfpEnnmWd++7zMM63d3V0RuljHQ9xFr7SP8QNfUOBPlmUzB5tsYBtLkb0eHpS/JzjEcd2hs7W1Vf1v4TkeoxMLu0EHa0VRLBdFcTIYDEC75vCsjO6mbGCnWlSCg1uKVTzK83xAqGFHqFmMX3iP7+X6HjbF67ud5/nnLvomXaxziVcY1WxDfMQLLDf8e+i3sZaIbq8hVjHC28SZtTZWIhs/TdKM8S3xsZW2eLrjOWIVMcFeO2Ik1Kc1R6xltoYI1+Y8Yl8Sxi7Funinz9s4SRzaEa/vKp4mzpx0hSHfjGzewUt8EpoA98voUuUoujgT7tdqxKEl3NN+QqDOMMuys6opRwscuI4jJrP8VYjytgxLjanX5uA/BA+qh7YuOBQadFOKLMv+Zde82Ae4uoHYlUZmTcGx8KwvymGWZVNjGhu9DzhdQOy09J0iNct75qd+VfrMkBIcYX+O4L74a5MUJHT8OGI/Nuc2zBOEd7iorS9KW5LrBH/jjZDeCK9LW5K/QatiGcsSFOsAAAAASUVORK5CYII=");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 0;
    }
    .list .right {
        width: .2rem;
        height:.2rem;
        border: .005rem solid rgb(159,159,159);
        border-radius: 50%;
        position: relative;
    }
    .list .line.disabled .right{
        border: 1px solid #9e9e9e;
        background-color: #9e9e9e;
    }
    .list .line.selected .left .title {
        color: #1799fa;
    }
    .list .line.selected .right {
        border: 1px solid #1799fa;
        background-color: #1799fa;
    }
    .list .line.selected .right::before {
        content: ' ';
        position: absolute;
        top: .04rem;
        left: .04rem;
        width: .12rem;
        height: .12rem;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAA90lEQVQ4ja3TMSuFURgH8GeQRGIwy6BkUbIYlHwBu0Umi8VkMVlMJoMvIcNdDAYlJuULWCSESBSLwc9we/P2eu715t6nznKe//Or0zknEF1YS3jAHRa7Aa7iy0/ddAquVUC47ARcT8APLPwX3PC73jGPCPRiGSvoqwFuJuAb5opMoFFqnmCwDbiVgK+YLecCn5XQGYYScDsBXzBTzQb2k/A5hkvBnSTzhOnsRIEBHCdDFxjBbtJ7xFQGFmigH0fJ8HOyd4/JVmAZDc2bP0yQct1ioh1YRYvn1cg0XGP8LzBDC/igAl5hrA7YCg30YE/zl5xitC6I+AYJmBaJbbKurAAAAABJRU5ErkJggg==");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        z-index: 1;
    }
</style>