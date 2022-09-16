<template>
  <div>
    <div
      id="sections"
      class="mb-10 space-y-16"
    >
      <SectionContent
        v-for="(section, key) in sections"
        :key="key"
        :section="section"
      />
    </div>
  </div>
</template>

<script>
import SectionContent from './SectionContent'
import * as SectionsGateway from '../../gateway/armin/services/sections'

export default {
  name: 'FeedProperties',

  components: {
    SectionContent
  },

  data () {
    return {
      sections: []
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init () {
      try {
        this.loadingError = false
        this.loading = true
        const data = await SectionsGateway.find('show=true&sort=sequenceToShow')
        this.sections = data.docs
      } catch (error) {
        this.loadingError = true
        console.error('Error: ', error)
      } finally {
        this.loading = false
      } 
    }
  }
}
</script>
