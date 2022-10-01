<template>
  <div
    class="flex justify-center w-full h-full p-10 bg-white"
  >
    <div
      class="w-full border rounded-md shadow-md md:w-3/5"
    >
      <div
        class="p-4"
      >
        <div
          class="space-y-4"
        >
          <label
            for="type"
            class="block"
          >
            <p>
              Qual o motivo do contato?
            </p>
            <select
              class="w-full border-gray-300 rounded-md focus:ring-0"
              name="type"
              id="type"
              v-model="state.type"
              :class="v$.type.$errors[0] ? 'border-red-500' : 'border-gray-300'"
              @focusout="v$.type.$reset()"
            >
              <option
                v-for="(reason, index) in reasonsForContact"
                :key="index"
                :value="reason.value"
              >
                {{ reason.label }}
              </option>
            </select>
          </label>

          <label
            for="name"
            class="block"
          >
            <p>
              Nome
            </p>
            <input
              class="w-full border-gray-300 rounded-md focus:ring-0"
              type="text"
              name="name"
              id="name"
              v-model="state.fullName"
              :class="v$.fullName.$errors[0] ? 'border-red-500' : 'border-gray-300'"
              @focusout="v$.fullName.$reset()"
            >
          </label>

          <label
            for="email"
            class="block"
          >
            <p>
              Email
            </p>
            <input
              class="w-full border-gray-300 rounded-md focus:ring-0"
              type="text"
              name="email"
              id="email"
              v-model="state.email"
              :class="v$.email.$errors[0] ? 'border-red-500' : 'border-gray-300'"
              @focusout="v$.email.$reset()"
            >
          </label>
          <label
            for="phone"
            class="block"
          >
            <p>
              Contato
            </p>
            <input
              class="w-full border-gray-300 rounded-md focus:ring-0"
              type="text"
              name="phone"
              id="phone"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model="state.contact"
              :class="v$.contact.$errors[0] ? 'border-red-500' : 'border-gray-300'"
              @focusout="v$.contact.$reset()"
            >
          </label>
          <label
            for="contact"
            class="block"
          >
            <p>
              Preferência de contato
            </p>
            <select
              class="w-full border-gray-300 rounded-md focus:ring-0"
              name="contact"
              id="contact"
              v-model="state.meanOfContact"
              :class="v$.meanOfContact.$error ? 'border-red-500' : 'border-gray-300'"
              @focusout="v$.meanOfContact.$reset()"
            >
              <option value="WHATSAPP">Whatsapp</option>
              <option value="EMAIL">Email</option>
              <option value="CALL">Ligação</option>
            </select>
          </label>

          <label
            for="description"
            class="block"
          >
            <p>
              Mensagem  
            </p>
            <textarea
              class="w-full border-gray-300 rounded-md focus:ring-0"
              name="description"
              id="description"
              rows="6"
              v-model="state.description"
              :class="v$.description.$errors[0] ? 'border-red-500' : 'border-gray-300'"
              @focusout="v$.description.$reset()"
            />
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
        </div>
      </div>
    </div>

    <SnackBar
      :show="snackBar.show"
      :message="snackBar.message"
      @closed="snackBar.show = false"
    />
  </div>
</template>

<script>
import { required, email } from '@vuelidate/validators'
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import * as ContactUsGateway from '../../gateway/armin/services/contactUs'
import SnackBar from '../commons/SnackBar'

export default {
  name: 'ContactUsForm',

  components: {
    SnackBar
  },

  setup () {
    const state = reactive({
        fullName: '',
        email: '',
        contact: '',
        meansOfContact: '',
        type: '',
        description: ''
    })
    const rules = {
      fullName: {
        required
      },
      email: {
        required,
        email
      },
      contact: {
        required
      },
      meanOfContact: {
        required
      },
      type: {
        required
      },
      description: {
        required
      }
    }
    const v$ = useVuelidate(rules, state, { $lazy: true })
    return { state, v$ }
  },
  // validationConfig: {
  //     $lazy: true,
  //   },
  
  data () {
    return {
      reasonsForContact: [
        {
          label: 'Vender minha propriedade',
          value: 'SELL_MY_PROPERTY'
        },
        {
          label: 'Alugar minha propriedade',
          value: 'RENT_MY_PROPERTY'
        },
        {
          label: 'Parcerias',
          value: 'PARTNERSHIPS'
        },
        {
          label: 'Política de privacidade',
          value: 'PRIVACY_POLICY'
        },
        {
          label: 'LGPD - Lei geral de proteção de dados',
          value: 'LGPD'
        },
        {
          label: 'Outros motivo',
          value: 'OTHERS'
        },
      ],
      sendingContact: false,
      snackBar: {
        show: false,
        message: ''
      },
    }
  },
  // validations () {
  //   return {
  //     contact: {
  //       fullName: {
  //         required
  //       },
  //       email: {
  //         required,
  //         email
  //       },
  //       contact: {
  //         required
  //       },
  //       meanOfContact: {
  //         required
  //       },
  //       type: {
  //         required
  //       },
  //       description: {
  //         required
  //       }
  //     }
  //   }
  // },

  mounted () {
    // console.log(this.v$.contact.fullName)
    if (!this.$route.query?.type) return
    this.contact.type = this.$route.query.type
  },

  methods: {
    async makeAContact () {
      await this.$nextTick()
      this.v$.$reset()
      this.v$.$touch()
      console.log(this.v$)
      if (this.v$.$invalid) {
        this.snackBar.message = 'Preencha o formulário corretamente'
        this.snackBar.show = true
        return
      }
      try {
        this.sendingContact = true
        const payload = this.makePayloadToContact()
        await ContactUsGateway.create(payload)
        this.snackBar.message = 'Agradecemos o contato!! Logo retornaremos ;)'
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
      }
      payload.contact = payload.contact.replace(/\D/g,'')
      return payload
    },

    clearContactForm () {
      this.contact.fullName = ''
      this.contact.email = ''
      this.contact.contact = ''
      this.contact.meanOfContact = ''
      this.contact.type = ''
      this.contact.description = ''
      this.v$.$reset()
    },
    log() {
      console.log(this.v$.contact.description)
    }
  }
}

</script>
