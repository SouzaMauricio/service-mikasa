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
          content: 'Política de Privacidade | Corretora Andréia Santos'
        },
        {
          name: 'og:description',
          content: 'Política de Privacidade'
        },
        {
          name: 'og:type',
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
