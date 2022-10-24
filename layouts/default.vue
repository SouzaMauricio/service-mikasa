<template>
  <div class="flex flex-col justify-between h-screen">
    <div>
      <TopBar
        class="sticky"
      />
      <div
        class="relative flex justify-center"
      >
        <Nuxt />
      </div>
    </div>
    
    <client-only>
      <PrivacyPolicyAccept
        v-if="$store && !$store.getters.isPrivacyPolicyAccepted || $store.getters.showUpdatePrivacyPolicy"
        :show-update-policy="$store.getters.showUpdatePrivacyPolicy"
      />
    </client-only>
    <EasterEggs />
    <FooterGeneral
      class="bottom-0"
    />
  </div>
</template>


<script>
import PrivacyPolicyAccept from '../components/container/PrivacyPolicyAccept'
import TopBar from '../components/container/TopBar'
import FooterGeneral from '../components/container/FooterGeneral'
import EasterEggs from '../components/commons/EasterEggs'

export default {
  name: 'Layout',

  components: {
    TopBar,
    FooterGeneral,
    PrivacyPolicyAccept,
    EasterEggs
  }
}

</script>
