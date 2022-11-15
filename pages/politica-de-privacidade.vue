<template>
  <div
    class="flex justify-center w-full h-full"
  >
    <PrivacyPolicy
      class="max-w-max-content"
    />
  </div>
</template>

<script>
import PrivacyPolicy from '../components/policy/PrivacyPolicy'

export default {
  name: 'PrivacyPolicyScreen',

  head () {
    return {
      title: 'Política de Privacidade | Corretora Andréia Santos',
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
          content: 'Política de Privacidade | Corretora Andréia Santos'
        },
        {
          property: 'og:description',
          content: 'Política de Privacidade'
        },
        {
          property: 'og:type',
          content: 'website'
        }
        // {
        //   property: 'og:url',
        //   content: 'website'
        // }
        // {
        //   property: 'og:image',
        //   content: 'website'
        // }
      ]
    }
  },

  components: {
    PrivacyPolicy
  }
}
</script>
