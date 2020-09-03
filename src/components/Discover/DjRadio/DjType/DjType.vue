<template>
  <div>
    <dj-type-item> 
      <span slot="new">优秀新电台</span>
      <span slot="top">电台排行榜</span>
    </dj-type-item>
  </div>
</template>
<script>
import DjTypeItem from './DjTypeItem'
export default {
  name: 'DjType',
  components: {
    DjTypeItem
  }
}
</script>
<style scoped>

</style>