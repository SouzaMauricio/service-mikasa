<template>
  <section
    class="flex w-full px-4 py-8 mx-auto bg-white max-w-max-content text-annie-text"
  >
    <div
      v-if="loading"
      class="flex items-center justify-center w-full"
    >
      <LoadingSpin
        text="Carregando informações da propriedade"
      />
    </div>
    <div
      v-if="unauthorized"
      class="flex items-center justify-center w-full"
    >
      <div
        class="items-center space-y-4"
      >
        <p
          class="text-xl font-medium text-center"
        >
          Essa propriedade não está disponível no momento :/
        </p>
        <div
          class="flex justify-center"
        >
          <img
            class="w-96"
            :src="require('../../assets/no-data-rafiki.png')"
            alt=""
          >
        </div>
      </div>
    </div>
    <div
      v-if="!loading && !loadingError && !unauthorized"
      class="sticky grid w-full gap-8 lg:items-start lg:grid-cols-3"
    >
      <div
        class="lg:space-y-10 lg:col-span-2 lg:row-span-1"
      >
          <div
            v-if="property.pictures && property.pictures[0]"
            class="w-auto lg:w-full"
          >
            <client-only>
              <flickity
                ref="flickity"
                :options="flickityOptions"
                class="max-h-104 h-104"
              >
                <div
                  class="flex items-center justify-center w-full h-full mx-1 md:w-4/6"
                  v-for="(picture, index) of property.pictures"
                  :key="index"
                >
                  <img
                    class="object-cover w-full h-full"
                    :src="picture.fullPath"
                    @click="showImageListModal(index)"
                  />
                </div>
              </flickity>
            </client-only>
          </div>
        <div
          class="flex justify-between mt-8 text-sm font-medium text-annie-primary lg:mt-0 md:text-base"
        >
          <div
            class="flex items-center space-x-2"
          >
            <span class="text-2xl icon-straighten"></span>
            <span
              class="hidden md:block"
            >
              Área:
            </span>
            <span>
              {{ localEnvironments.area }}m²
            </span>
          </div>
          <div
            v-if="localEnvironments.bedroom"
            class="flex items-center space-x-2"
          >
            <span class="text-2xl icon-hotel"></span>
            <span
              class="hidden md:block"
            >
              Dormitórios:
            </span>
            <span>
              {{ localEnvironments.bedroom }}
            </span>
          </div>
          <div
            v-if="localEnvironments.suites"
            class="flex items-center space-x-2"
          >
            <span class="text-2xl icon-bathtub"></span>
            <span
              class="hidden md:block"
            >
              Suítes:
            </span>
            <span>
              {{ localEnvironments.suites }}
            </span>
          </div>
          <div
            v-if="localEnvironments.bathrooms"
            class="flex items-center space-x-2"
          >
            <span class="text-xl icon-shower"></span>
            <span
              class="hidden md:block"
            >
              Banheiros: 
            </span>
            <span
              class="font-medium"
            >
              {{ localEnvironments.bathrooms }}
            </span>
          </div>
          <div
            v-if="localEnvironments.garages"
            class="flex items-center space-x-2"
          >
            <span class="text-2xl icon-directions_car"></span>
            <span
              class="hidden md:block"
            >
              Vagas: 
            </span>
            <span>
              {{ localEnvironments.garages }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="top-0 h-auto space-y-5 lg:h-full lg:top-24 lg:row-span-3"
      >
        <div
          class="flex items-center justify-between w-full space-y-0"
        >
          <div>
            <span
              class="px-6 font-medium text-white rounded-full bg-annie-primary"
            >
              {{ typeLabels[property.type] }}
            </span>
          </div>

          <div
            class="flex text-sm"
          >
            <div
              class="flex items-center space-x-2"
            >
              <button
                v-if="$store.getters.isFavorited(property.cod)"
                @click="removeFavorite()"
                class="flex items-center justify-center p-1 space-x-0 rounded-full sm:space-x-2 lg:space-x-0 xl:space-x-2 hover:bg-gray-100"
              >
                <span
                  class="hidden sm:block lg:hidden xl:block"
                >
                  Favoritar
                </span>
                <span class="text-2xl icon-favorite text-annie-primary">
                </span>
              </button>
              <button
                v-else
                @click="addToFavorite()"
                class="flex items-center justify-center p-1 space-x-0 rounded-full sm:space-x-2 lg:space-x-0 xl:space-x-2 hover:bg-gray-100"
              >
                <span
                  class="hidden sm:block lg:hidden xl:block"
                >
                  Favoritar
                </span>
                <span class="text-2xl icon-favorite_outline text-annie-primary"></span>
              </button>
            </div>
            <div
              class="flex items-center"
            >
              <button
                class="flex items-center justify-center p-1 space-x-0 rounded-full sm:space-x-2 lg:space-x-0 xl:space-x-2 hover:bg-gray-100"
                @click="copyUrl()"
              >
                <span
                  class="hidden sm:block lg:hidden xl:block"
                >
                  Compartilhar
                </span>
                <span class="text-2xl icon-share text-annie-primary"></span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p
            class="text-xl font-medium"
          >
            {{ property.title }}
          </p>
        </div>

        <div
          class="block"
        >
          <p>
            {{ `${property.localization ? property.localization.neighborhood : '' }, ${ property.localization ? property.localization.city : ''} - ${ property.localization ? property.localization.state : '' }` }}
          </p>
        </div>

        <div
          class="text-xl font-semibold"
        >
          <p
            v-if="property.toSell"
          >
            Venda: {{ formatCurrency(property.price.sale) }}
          </p>
          <p
            v-if="property.toRent"
          >
            Locação: {{ formatCurrency(property.price.rent) }}
          </p>
        </div>

        <div
          class="top-0 p-4 border rounded-md lg:sticky lg:top-24"
        >
          <p
            class="mb-4 text-lg font-medium"
          >
            Fale com o corretor
          </p>
          
          <div
            class="space-y-4"
          >
            <label
              for="name"
              class="block"
            >
              <p
                class="text-sm"
              >
                Nome
              </p>
              <input
                class="w-full border-gray-300 rounded-md focus:ring-0"
                type="text"
                name="name"
                id="name"
                v-model="contact.fullName"
                :class="contactFormError.fullName ? 'border-red-500' : 'border-gray-300'"
                @focusout="checkFormProperty('fullName')"
              >
            </label>
            <label
              for="email"
              class="block"
            >
              <p
                class="text-sm"
              >
                Email
              </p>
              <input
                class="w-full border-gray-300 rounded-md focus:ring-0"
                type="text"
                name="email"
                id="email"
                v-model="contact.email"
                :class="contactFormError.email ? 'border-red-500' : 'border-gray-300'"
                @focusout="checkFormProperty('email')"
              >
            </label>
            <label
              for="phone"
              class="block"
            >
              <p
                class="text-sm"
              >
                Contato
              </p>
              <input
                class="w-full border-gray-300 rounded-md focus:ring-0"
                type="text"
                name="phone"
                id="phone"
                v-mask="['(##) ####-####', '(##) #####-####']"
                v-model="contact.contact"
                :class="contactFormError.contact ? 'border-red-500' : 'border-gray-300'"
                @focusout="checkFormProperty('contact')"
              >
            </label>
            <label
              for="contact"
              class="block"
            >
              <p
                class="text-sm"
              >
                Preferência de contato
              </p>
              <select
                class="w-full border-gray-300 rounded-md focus:ring-0"
                name="contact"
                id="contact"
                v-model="contact.meanOfContact"
                :class="contactFormError.meanOfContact ? 'border-red-500' : 'border-gray-300'"
                @focusout="checkFormProperty('meanOfContact')"
              >
                <option value="WHATSAPP">Whatsapp</option>
                <option value="EMAIL">Email</option>
                <option value="CALL">Ligação</option>
              </select>
            </label>
          </div>
          <div
            class="flex items-center justify-between mt-4"
          >
            <button
              class="flex items-center justify-center w-24 px-6 py-1 text-white rounded-full bg-annie-primary hover:opacity-90 disabled:opacity-75"
              @click="makeAContact()"
            >
              <span
                v-if="sendingContact"
                class="w-6 h-6 text-2xl text-white animate-spin icon-spinner10"
              >
              </span>
              <span
                v-else
              >
                Enviar
              </span>
            </button>

            <p
              class="text-xs"
            >
              Código do imóvel: {{ property.cod }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="lg:col-span-2 text-annie-text lg:space-y-10 lg:row-span-1"
      >
        <div>
          <p
            class="py-2 text-xl font-medium border-b-2"
          >
            Sobre o imóvel
          </p>
          
          <p
            class="mt-6"
          >
            {{ property.description }}
          </p>
        </div>

        <div
          class="mt-6"
          v-if="property.type !== 'RELEASE' && property.environments"
        >
          <p
            class="py-2 text-xl font-medium border-b-2"
          >
            Ambientes
          </p>

          <ul
            class="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3"
          >
            <li
              v-if="fullEnvironments.bedroom"
              class="flex space-x-2"
            >
              <span class="text-xl icon-hotel"></span>
              <span>
                Dormitórios: {{ fullEnvironments.bedroom }}
              </span>
            </li>
            <li
              v-if="fullEnvironments.bathrooms"
              class="flex space-x-2"
            >
              <span class="text-md icon-shower"></span>
              <span>
                Banheiros: {{ fullEnvironments.bathrooms }}
              </span>
            </li>
            <li
              v-if="fullEnvironments.suites"
              class="flex space-x-2"
            >
              <span class="text-xl icon-bathtub"></span>
              <span>
                Suítes: {{ fullEnvironments.suites }}
              </span>
            </li>
            <li
              v-if="fullEnvironments.toilet"
              class="flex space-x-2"
            >
              <span class="text-xl icon-wash"></span>
              <span>
                Lavabos: {{ fullEnvironments.toilet }}
              </span>
            </li>
            <li
              v-if="fullEnvironments.garages"
              class="flex space-x-2"
            >
              <span class="text-xl icon-directions_car"></span>
              <span>
                Vagas: {{ fullEnvironments.garages }}
              </span>
            </li>
            <li
              v-if="fullEnvironments.livingroom"
              class="flex space-x-2"
            >
              <span class="text-xl icon-weekend"></span>
              <span>
                Salas: {{ fullEnvironments.livingroom }}
              </span>
            </li>
            <li
              v-if="fullEnvironments.balcony"
              class="flex space-x-2"
            >
              <span class="text-xl icon-wb_twighlight"></span>
              <span>
                Varandas: {{ fullEnvironments.balcony }}
              </span>
            </li>
          </ul>
        </div>

        <div
          class="mt-6 space-y-4"
          v-if="property.release"
        >
          <p
            class="py-2 text-xl font-medium border-b-2"
          >
            Unidades
          </p>

          <div
            class="space-y-4"
          >
            <div
              class="flex p-2 space-x-4 border rounded-md text-md text-bertolt-primary"
              v-for="(unit, index) in property.release.units"
              :key="index"
            >
              <div
                @click="showUnitData(unit)"
                class="relative w-24 h-24 cursor-pointer"
              >
                <img
                  class="z-10 object-cover w-24 h-24 rounded-md min-w-[6rem]"
                  :src="unit.image ? unit.image.fullPath : require('../../assets/no_picture.jpg')"
                  alt=""
                >
                <div
                  class="absolute top-0 z-30 flex items-center justify-center w-24 h-24 bg-black opacity-30"
                >
                  <span class="text-3xl text-white opacity-100 icon-search"></span>
                </div>
              </div>
              <div
                class="w-full"
              >
                <div
                  class="space-y-2"
                >
                  <div
                    class="flex justify-start"
                  >
                    <p>
                      Unidade: {{ unit.area }}m²
                    </p>
                  </div>
                  <div
                    class="flex flex-wrap gap-4"
                  >
                    <div
                      v-if="unit.bedroom"
                      class="flex items-center space-x-2"
                    >
                      <span class="text-xl icon-hotel"></span>
                      <p
                        class="hidden md:block"
                      >
                        Quartos:
                      </p>
                      <p>
                         {{ unit.bedroom }}
                      </p>
                    </div>
                    <div
                      v-if="unit.bathrooms"
                      class="flex items-center space-x-2"
                    >
                      <span class="text-lg icon-shower"></span>
                      <p
                        class="hidden md:block"
                      >
                        Banheiros:
                      </p>
                      <p>
                         {{ unit.bathrooms }}
                      </p>
                    </div>
                    <div
                      v-if="unit.suites"
                      class="flex items-center space-x-2"
                    >
                      <span class="text-xl icon-bathtub "></span>
                      <p
                        class="hidden md:block"
                      >
                        Suítes:
                      </p>
                      <p>
                        {{ unit.suites }}
                      </p>
                    </div>
                    <div
                      v-if="unit.toilet"
                      class="flex items-center space-x-2"
                    >
                      <span class="text-xl icon-wash "></span>
                      <p
                        class="hidden md:block"
                      >
                        Lavabos:
                      </p>
                      <p>
                        {{ unit.toilet }}
                      </p>
                    </div>
                    <div
                      v-if="unit.garages"
                      class="flex items-center space-x-2"
                    >
                      <span class="text-xl icon-drive_eta"></span>
                      <p
                        class="hidden md:block"
                      >
                        Vagas:
                      </p>
                      <p>
                         {{ unit.garages }}
                      </p>
                    </div>
                    <div
                      v-if="unit.livingroom"
                      class="flex items-center space-x-2"
                    >
                      <span class="text-xl icon-weekend"></span>
                      <p
                        class="hidden md:block"
                      >
                        Salas:
                      </p>
                      <p>
                        {{ unit.livingroom }}
                      </p>
                    </div>
                    <div
                      v-if="unit.balcony"
                      class="flex items-center space-x-2"
                    >
                      <span class="text-xl icon-wb_twighlight"></span>
                      <p
                        class="hidden md:block"
                      >
                        Varandas:
                      </p>
                      <p>
                        {{ unit.balcony }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="mt-6 space-y-4"
          v-if="property.condominium"
        >
          <p
            class="py-2 text-xl font-medium border-b-2"
          >
            Condomínio
          </p>

          <div
            v-if="property.condominium.name || property.condominium.price"
            class="flex items-center justify-start space-x-6"
          >
            <p
              v-if="property.condominium.name"
            >
              <b>
                Nome:
              </b>
              {{ property.condominium.name }}
            </p>
            <p
              v-if="property.condominium.price"
            >
              <b>
                Valor:
              </b>
              {{ formatCurrency(property.condominium.price) }}
            </p>
          </div>
          <p
            v-if="property.condominium.facilities && property.condominium.facilities[0]"
            class="font-semibold text-md"
          >
            Instalações:
          </p>
          <ul
            class="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3"
          >
            <li
              v-for="(facility, index) of property.condominium.facilities"
              :key="index"
              class="flex items-center space-x-2"
            >
              <span :class="facility.icon"></span>
              <span>
                {{ facility.facility }}
              </span>
            </li>
          </ul>
        </div>

        <div
          class="mt-6"
          v-if="property.nearby && property.nearby[0]"
        >
          <p
            class="py-2 text-xl font-medium border-b-2"
          >
            O que há nas proximidades
          </p>

          <ul
            class="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3"
          >
            <li
              v-for="(nearby, index) of property.nearby"
              :key="index"
              class="flex items-center space-x-2"
            >
              <span :class="nearby.icon"></span>
              <span>
                {{ `${nearby.title}: ${getFormattedDistance(nearby.distance)}` }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <SnackBar
      :show="snackBar.show"
      :message="snackBar.message"
      @closed="snackBar.show = false"
    />
    <CustomModal
      :show="showUnitImage.show"
      maxW="max-w-3xl"
    >
      <template
        v-slot:content
      >
        <div
          class="p-4"
        >
          <div
            class="flex justify-end"
          >
            <button
              @click="showUnitImage.show = false"
            >
              <span class="text-3xl icon-clear" ></span>
            </button>
          </div>
          <div
            class="flex justify-center"
          >
            <img
              class="w-125"
              :src="showUnitImage.image"
              alt=""
            >
          </div>
        </div>
      </template>
    </CustomModal>
  </section>
</template>
<script>
import * as ContactGateway from '../../gateway/armin/services/contacts'
import SnackBar from '../commons/SnackBar'
import LoadingSpin from '../commons/LoadingSpin'
import CustomModal from '../commons/CustomModal'
import * as PropertyGateway from '../../gateway/armin/services/properties'
import { formatPtBrCurrency } from '../../services/formatCurrency'
import * as EmailValidator from 'email-validator'

export default {
  name: 'PropertyContent',

  props: {
    propertyCod: {
      type: String,
      required: true
    }
  },

  components: {
    CustomModal,
    SnackBar,
    LoadingSpin
  },

  head () {
    return {
      title: this.property.title + ' | Corretora Andréia Santos',
      meta: [
        //Google
        {
          itemprop: 'name',
          content: 'Corretora Andréia Santos'
        },
        {
          itemprop: 'description',
          content: this.property.description
        },
        //Whataspp/Facebook
        {
          property: 'og:site_name',
          content: 'Corretora Andréia Santos'
        },
        {
          property: 'og:title',
          content: this.property.title + ' | Corretora Andréia Santos'
        },
        {
          property: 'og:description',
          content: this.property.description
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:image',
          content: this.property.pictures[0].fullPath
        }
      ]
    }
  },

  data () {
    return {
      showImageGallery: false,
      iconTest:'text-xl icon-cutlery',
      property: {
        pictures: [{ fullPath: '' }]
      },
      typeLabels: {
        'APARTMENT': 'Apartamento',
        'HOUSE_IN_CONDOMINIUM': 'Casa',
        'PRIVATE_HOUSE': 'Casa',
        'RELEASE': 'Lançamento',
      },
      showUnitImage: {
        show: false,
        image: null
      },
      localEnvironments: {},
      fullEnvironments: {},
      snackBar: {
        show: false,
        message: ''
      },
      sendingContact: false,
      contact: {
        fullName: '',
        email: '',
        contact: '',
        meanOfContact: ''
      },
      contactFormError: {
        fullName: false,
        email: false,
        contact: false,
        meanOfContact: false
      },
      loading: false,
      loadingError: false,
      unauthorized: false,
      images: [],
      imageOptions: {
        inline: true,
        button: true,
        navbar: true,
        title: false,
        toolbar: true,
        tooltip: false,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: false,
        fullscreen: false,
        keyboard: true,
        initialViewIndex: 0
      },
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: true,
        pageDots: false,
        wrapAround: true
      }
    }
  },

  async fetch () {
    await this.init()
  },

  methods: {
    async init () {
      try {
        this.loading = true
        this.property = await PropertyGateway.getOneByCod(this.propertyCod)
        this.$store.commit('setNewVisit', this.property.cod)
        this.images = this.property.pictures.map(picture => picture.fullPath)
        this.setPropertyEnvironments(this.property)
      } catch (error) {
        this.loadingError = true
        if (
          error.response &&
          error.response.status &&
          error.response.status === 401
        ) {
          this.unauthorized = true
          this.snackBar.message = 'A propriedade não está disponível'
          this.snackBar.show = true
          return
        }
        this.snackBar.message = (error.response ? error.response.message : error.message) || 'Erro ao carregar as informações da propriedade, tente novamente'
        this.snackBar.show = true
        console.error('Error: ', error)
      } finally {
        this.loading = false
      }
    },

    showUnitData (unit) {
      this.showUnitImage.image = unit.image ? unit.image.fullPath : require('../../assets/no_picture.jpg')
      this.showUnitImage.show = true
    },

    setPropertyEnvironments (property) {
      if (property.type === 'RELEASE') {
        this.setReleaseEnvironments(property)
        return
      }
      this.setGeneralEnvironments(property)
      this.setFullGeneralEnvironments(property)
    },

    setReleaseEnvironments (property) {
      const environments = [
        'bedroom',
        'bathrooms',
        'garages',
        'area'
      ]
      environments.forEach(environment => {
        const unitEnvironmentCount = property.release.units.reduce((acc, currentUnit) => {
          if (!currentUnit[environment]) return acc
          acc.push(currentUnit[environment])
          return acc
        }, [])
        const unitEnvironmentFiltered = [...new Set(unitEnvironmentCount)]
        if (!unitEnvironmentFiltered[0]) {
          this.localEnvironments[environment] = null
          return
        }
        if (!unitEnvironmentFiltered[1]) {
          this.localEnvironments[environment] = unitEnvironmentFiltered[0]
          return
        }
        const max = Math.max(...unitEnvironmentFiltered)
        const min = Math.min(...unitEnvironmentFiltered)
        this.localEnvironments[environment] = `${min} a ${max}`
      })
    },
    
    setGeneralEnvironments (property) {
      this.localEnvironments.area = property.propertyArea
      for (let environment of Object.keys(property.environments)) {
        if (!property.environments[environment][0]) {
          this.localEnvironments[environment] = null
          continue
        }
        if (!property.environments[environment][1]) {
          this.localEnvironments[environment] = property.environments[environment][0]
          continue
        }
        const max = Math.max(...property.environments[environment])
        const min = Math.min(...property.environments[environment])
        this.localEnvironments[environment] = `${min} a ${max}`
      }
    },
    
    setFullGeneralEnvironments (property) {
      for (let environment of Object.keys(property.environments)) {
        this.fullEnvironments[environment] = property.environments[environment].join(', ')
      }
    },

    async makeAContact () {
      const hasErrors = this.hasFormErrors()
      if (hasErrors) {
        this.snackBar.message = 'Preencha o formulário corretamente'
        this.snackBar.show = true
        return
      }
      try {
        this.sendingContact = true
        const payload = this.makePayloadToContact()
        await ContactGateway.create(payload)
        this.snackBar.message = 'Agradecemos a preferência!! Logo entraremos em contato ;)'
        this.snackBar.show = true
        this.clearContactForm()
      } catch (error) {
        this.snackBar.message = (error.response ? error.response.message : error.message) || 'Erro inesperado, tente novamente'
        this.snackBar.show = true
        console.error('Error: ', error)
      } finally {
        this.sendingContact = false
      }
    },

    makePayloadToContact () {
      const payload = {
        ...this.contact,
        property: this.property._id
      }
      payload.contact = payload.contact.replace(/\D/g,'')
      return payload
    },

    clearContactForm () {
      this.contact.fullName = ''
      this.contact.email = ''
      this.contact.contact = ''
      this.contact.meanOfContact = ''
      this.clearFormValidate()
    },

    addToFavorite () {
      this.$store.commit('addInFavoriteList', { ...this.property })
    },

    removeFavorite () {
      this.$store.commit('removeFromFavoriteList', this.property.cod)
    },

    formatCurrency (value) {
      return formatPtBrCurrency(value)
    },

    async copyUrl() {
      try {
        const textToCopy = window.location.href
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy)
            this.snackBar.message = 'Link copiado!!'
            this.snackBar.show = true
        } else {
            let textArea = document.createElement("textarea")
            textArea.value = textToCopy
            textArea.style.position = "fixed"
            textArea.style.left = "-999999px"
            textArea.style.top = "-999999px"
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            return new Promise((res, rej) => {
                document.execCommand('copy') ? res() : rej()
                textArea.remove()
                this.snackBar.message = 'Link copiado!!'
                this.snackBar.show = true
            })
        }
      } catch(error) {
        this.snackBar.message = error.message
        this.snackBar.show = true
      }
    },
    
    getFormattedDistance(distance) {
      const KM = 1000
      const distanceInKm = distance / KM
      if (distanceInKm >= 1) return `${distanceInKm}km`
      return `${distance}m`
    },

    showImageListModal(index) {
      this.imageOptions.initialViewIndex = index
      this.$viewerApi({
        images: this.images,
        options: this.imageOptions
      })
    },
    
    clearFormValidate () {
      for(const key in this.contactFormError) {
        this.contactFormError[key] = false
      }
    },

    checkFormProperty (prop) {
      this.contactFormError[prop] = this.validateProp(prop)
    },

    validateProp (prop) {
      if (!this.contact[prop]) return true
      if (prop !== 'email') return false
      return !EmailValidator.validate(this.contact[prop])
    },

    hasFormErrors () {
      for(const key in this.contactFormError) {
        this.checkFormProperty(key)
      }
      return !Object.values(this.contactFormError).every((value) => value === false)
    }
  }
}
</script>
