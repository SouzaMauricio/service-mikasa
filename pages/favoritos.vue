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
          itemprop: 'name',
          content: 'Corretora Andréia Santos'
        },
        {
          itemprop: 'description',
          content: 'Política de Privacidade'
        },
        //Whataspp/Facebook
        {
          property: 'og:site_name',
          content: 'Corretora Andréia Santos'
        },
        {
          property: 'og:title',
          content: 'Imóveis favoritados | Corretora Andréia Santos'
        },
        {
          property: 'og:description',
          content: 'Política de Privacidade'
        },
        {
          property: 'og:type',
          content: 'website'
        }
      ]
    }
  },
}
</script>
