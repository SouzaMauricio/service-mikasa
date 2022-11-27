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
  },

  head () {
    return {
      title: 'Imóveis favoritados | Corretora Andréia Santos',
      meta: [
        //Google
        {
          name: 'name',
          content: 'Corretora Andréia Santos'
        },
        {
          name: 'description',
          content: 'Política de Privacidade'
        },
        //Whataspp/Facebook
        {
          name: 'og:site_name',
          content: 'Corretora Andréia Santos'
        },
        {
          name: 'og:title',
          content: 'Imóveis favoritados | Corretora Andréia Santos'
        },
        {
          name: 'og:description',
          content: 'Política de Privacidade'
        },
        {
          name: 'og:type',
          content: 'website'
        }
      ]
    }
  },
}
</script>
