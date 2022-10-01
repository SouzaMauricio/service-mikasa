<template>
  <div
    class="flex justify-center w-full h-full"
  >
    <SearchContent
      type="rent"
      :pathSearch="this.$route.query.search"
      class="max-w-max-content"
    />
  </div>
</template>

<script>
import SearchContent from '../components/search/SearchContent'

export default {
  name: 'RentScreen',

  components: {
    SearchContent
  }
}
</script>
