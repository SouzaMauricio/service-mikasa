<template>
  <div
    class="flex justify-center w-full h-full"
  >
    <client-only>
      <FavoritesList
        class="max-w-max-content"
      />
    </client-only>
  </div>
</template>

<script>
import FavoritesList from '../components/favorite/FavoritesList'

export default {
  name: 'FavoriteScreen',

  components: {
    FavoritesList
  }
}
</script>
