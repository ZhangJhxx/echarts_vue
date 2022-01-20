<template>
  <div>
    <ul>
      <li v-for="item in treeData" :key="item.name">{{item.name}}
        <ul ></ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        treeData:[],
      }
    },
    mounted(){
      this.getTreeData();
    },
    methods:{
      async getTreeData(){
        const {data:res}= await this.axios.get('infinateTree');
        this.treeData.push(...res);
      }
    }
   }
</script>

<style lang='less' scoped>

</style>