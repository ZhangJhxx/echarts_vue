<template>
  <div class="waterfall">
    <div v-for="photo in photos" :key="photo.id"><img v-lazy="photo.src['large']" alt=""></div>
  </div>
</template>

<script>
  import fetchUrl from '../assets/utils/tools.js'
  import debounce from '../assets/utils/debounce.js'
  export default {
    data(){
      return {
        photos:[],
        currpage:1,
      }
    },
    mounted(){
      this.getData(this.currpage,'girl',20);
      window.addEventListener('scroll',debounce(this.freshPage))
    },
    destroyed(){
      window.removeEventListener('scroll');
    },
    methods:{
      getData(page=1,queryStr='beauty',per_page=10){
        fetchUrl('https://api.pexels.com/v1/search',{
          query:queryStr,
          per_page:per_page,
          page:page
        }).then(data=>{
          this.photos.push(...data.photos);
        })
      },
      freshPage(){
        let scrollTop =window.scrollTop || document.documentElement.scrollTop ;
        let clientHeight =window.innerHeight || document.documentElement.clientHeight ;
        let totalHeight =document.documentElement.scrollHeight;
        if(Math.ceil(scrollTop+clientHeight)>=totalHeight){
         this.getData(++this.currpage,'girl',20);
        }
      }
    }
   }
</script>

<style lang='less' scoped>
  @media screen and (min-width: 960px) {
    .waterfall{
     column-count: 4;
      &>div{
        width: 100%;
        padding: 10px;
        img{
          width:100%;
        }
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 960px){
    .waterfall{
     column-count: 3;
      &>div{
        width: 100%;
        padding: 8px;
        img{
          width:100%;
        }
      }
    }
  }
   @media screen and (max-width:768px) and (min-width:360px){
    .waterfall{
     column-count: 2;
      &>div{
        width: 100%;
        padding: 6px;
        img{
          width:100%;
        }
      }
    }
  }
  @media screen and (max-width:360px){
    .waterfall{
     column-count: 1;
      &>div{
        width: 100%;
        padding:5px;
        img{
          width:100%;
        }
      }
    }
  }
  
</style>