<template>
  <div
    class="fixed inset-x-0 bottom-0"
  >
    <div
      class="relative flex items-center justify-center px-4 py-8 space-x-6 text-white pr-14 bg-annie-text"
    >
      <p
        class="text-sm font-medium text-left sm:text-center"
      >
        {{ text[selectedText] }}
        <router-link
          to="/politica-de-privacidade"
          class="underline"
        >
          Política de Privacidade
        </router-link>
      </p>
      
      <button
        class="px-4 py-2 font-medium bg-white rounded-md shadow-sm text-annie-text"
        @click="acceptPrivacyPolicy()"
        name="aceitar-termos"
        id="aceitar-termos"
      >
        Entendi!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicyAccept',

  props: {
    showUpdatePolicy: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      text: {
        updated: 'Atualizamos nossa Política de Privacidade, você pode acessar no seguinte link: ',
        firstVisit: 'Nosso site utiliza a tecnologia de Local Storage para te proporcionar uma melhor experiência. Ao navegar no site nosso site, você concorda com a nossa '
      },
      selectedText: this.showUpdatePolicy ? 'updated' : 'firstVisit'
    }
  },

  methods: {
    acceptPrivacyPolicy () {
      this.$store.commit('privacyPolicyAccept')
    }
  }
}
</script>
