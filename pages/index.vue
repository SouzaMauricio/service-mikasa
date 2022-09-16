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
      title: 'Andréia Negócios Imobiliários',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Não vendemos apenas imóveis, realizamos sonhos e projetos de vida.'
        }
      ]
    }
  },
  components: {
    MainContent
  }
}
</script>
