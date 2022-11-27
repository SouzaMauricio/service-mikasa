<template>
  <div
    class="w-full h-full"
  >
    <MainContent />
  </div>
</template>

<script>
import MainContent from '../components/main/MainContent'

export default {
  name: 'Index',

  head() {
    return {
      title: 'Corretora Andréia Santos',
      meta: [
        //Google
        {
          name: 'name',
          content: 'Corretora Andréia Santos'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Não vendemos apenas imóveis, realizamos sonhos e projetos de vida.'
        },
        //Whataspp/Facebook
        {
          name: 'og:site_name',
          content: 'Corretora Andréia Santos'
        },
        {
          name: 'og:title',
          content: 'Corretora Andréia Santos'
        },
        {
          name: 'og:description',
          content: 'Não vendemos apenas imóveis, realizamos sonhos e projetos de vida.'
        },
        {
          name: 'og:type',
          content: 'website'
        }
      ]
    }
  },
  components: {
    MainContent
  }
}
</script>
