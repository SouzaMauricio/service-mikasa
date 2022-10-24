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
      title: 'Fale Conosco | Andréia Negócios Imobiliários',
      meta: [
        //Google
        {
          itemprop: 'name',
          content: 'Andréia Negócios Imobiliários'
        },
        {
          itemprop: 'description',
          content: 'Fale Conosco'
        },
        //Whataspp/Facebook
        {
          property: 'og:site_name',
          content: 'Andréia Negócios Imobiliários'
        },
        {
          property: 'og:title',
          content: 'Fale Conosco | Andréia Negócios Imobiliários'
        },
        {
          property: 'og:description',
          content: 'Fale Conosco'
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
    ContactUsForm
  }
}
</script>
