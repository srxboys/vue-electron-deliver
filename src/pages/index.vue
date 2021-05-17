<template>
  <div class="rxindex">
    <div class="title">
      <b>读取 Excel</b>
    </div>
    <export />
  </div>
</template>

<script>
import Export from '@/components/Export'
export default {
  components: { Export }
}
</script>

<style>
.rxindex { margin: 0 15px; }
.rxindex .title { margin: 20px 0; }
</style>
