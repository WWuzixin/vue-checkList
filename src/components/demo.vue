<template>
    <div>
        <div class="check-title">
            <h2>checklist</h2>
        </div>
        <div class="check-wrap">
            <input type="text" @focus="openChecklist" value="请选择考场">
        </div>
        <checklist ref="checklist" :data-list="data" :max="3" @on-change="changeKaochangValue"></checklist>
        <p v-for="(item, index) in kaochangVal">{{item.label}}</p>
    </div>
</template>

<script>
 import checklist from '@/components/checklist'
 export default {
   data () {
     return {
       data: [{
         label: '科目二第07考点马路',
         value: '101',
         address: '广州市天河区'
       }, {
         label: '科目二第08考点马路杀手',
         value: '102',
         address: '广州市天河区荔湾'
       }, {
         label: '科目二第09考点马路杀手',
         value: '103',
         address: '广州市天河区海珠广场'
       }, {
         label: '科目二第10爆胎了',
         value: '104',
         address: '广州市天河区大学城'
       }, {
         label: '科目二第11飞出去了',
         value: '105',
         address: '广州市天河区广州塔'
       }, {
         label: '科目二第07考点马路',
         value: '106',
         address: '广州市天河区珠江'
       }],
       kaochangVal: []
     }
   },
   components: {
     'checklist': checklist
   },
   methods: {
     openChecklist () {
       this.$refs['checklist'].show()
     },
     changeKaochangValue (val) {
       this.kaochangVal = val
     }
   }
 }
</script>

<style scoped>
    .check-title {
        font-size: .18rem;
    }
    .check-wrap {
        display: flex;
        margin-bottom:.1rem;
    }
    .check-wrap>input{
        border:none;
        font-size: .16rem;
        width: 100%;
        color: gray;
    }
    p {
      font-size: .16rem;
    }
</style>
