<template>
  <div
    class="flex justify-center w-full h-full"
  >
    <ContactUsForm
      class="max-w-max-content"
    />
  </div>
</template>

<script>
import ContactUsForm from '../components/contact/ContactUsForm'

export default {
  name: 'ContactUsScreen',

  head() {
    return {
      title: 'Fale Conosco | Corretora Andréia Santos',
      meta: [
        //Google
        {
          name: 'name',
          content: 'Corretora Andréia Santos'
        },
        {
          name: 'description',
          content: 'Fale Conosco'
        },
        //Whataspp/Facebook
        {
          name: 'og:site_name',
          content: 'Corretora Andréia Santos'
        },
        {
          name: 'og:title',
          content: 'Fale Conosco | Corretora Andréia Santos'
        },
        {
          name: 'og:description',
          content: 'Fale Conosco'
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
    ContactUsForm
  }
}
</script>
