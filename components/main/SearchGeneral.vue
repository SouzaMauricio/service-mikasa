<template>
  <div
    class="items-center px-4 py-2 space-y-4 text-sm bg-white rounded-md shadow-md md:px-16 md:text-lg"
    :class="showFilters ? 'h-auto' : 'h-48'"
  >
    <div
      class="flex items-center justify-center space-x-2 md:space-x-8"
    >
      <button
        class="px-2 py-3 font-medium hover:bg-gray-50 md:px-4 whitespace-nowrap"
        :class="typeOfSearch === 'comprar' ? 'border-b-2 border-annie-primary text-annie-primary' : 'text-gray-500'"
        @click="typeOfSearch = 'comprar'"
        name="selecionar-comprar"
        id="selecionar-comprar"
      >
        Quero Comprar
      </button>

      <button
        class="px-2 py-3 font-medium hover:bg-gray-50 md:px-4 whitespace-nowrap"
        :class="typeOfSearch === 'alugar' ? 'border-b-2 border-annie-primary text-annie-primary' : 'text-gray-500'"
        @click="typeOfSearch = 'alugar'"
        name="selecionar-alugarr"
        id="selecionar-alugar"
      >
        Quero Alugar
      </button>
    </div>
    <div
      class="flex items-center justify-center flex-1 w-full space-x-4"
    >
      <div
        class="flex items-center w-full space-x-0 border-b border-gray-400 md:space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          class="w-full text-sm border-0 outline-0 focus:ring-0 md:text-lg"
          placeholder="Região, empreendimento ou código"
          v-model="search.search"
          @keydown.enter="redirectToSearch()"
        >
      </div>

      <button
        class="hidden px-8 py-1 text-white rounded-full bg-annie-primary hover:opacity-80 md:block"
        @click="redirectToSearch()"
        name="buscar-imoveis"
      >
        Buscar
      </button>
    </div>
    <div
      class="flex items-center justify-center space-x-4 md:justify-start"
    >
      <button
        class="flex items-center space-x-4 font-medium"
        @click="showFilters = !showFilters"
        name="mostrar-ocultar-filtros"
        id="mostrar-ocultar-filtros"
      >
        <span>
          Filtrar
        </span>

        <span v-if="showFilters" class="text-lg icon-keyboard_arrow_up"></span>
        <span v-else class="text-lg icon-keyboard_arrow_down"></span>
      </button>

      <button
        class="block px-8 py-1 text-white rounded-full bg-annie-primary hover:opacity-80 md:hidden"
        @click="redirectToSearch()"
        name="buscar-imoveis"
      >
        Buscar
      </button>
    </div>
    <div
      v-show="showFilters"
      class="flex flex-wrap items-end gap-4 pb-2 text-base text-gray-700"
    >
      <label
        for="min-value"
      >
        <p
          class="text-sm font-medium"
        >
          Mínimo
        </p>
        <input
          class="w-40 border border-gray-300 rounded-md focus:ring-0 focus:border-annie-primary"
          type="text"
          v-model="search.minValue"
          name="min-value"
          id="min-value"
          v-money="money"
        >
      </label>
      <label
        for="max-value"
      >
        <p
          class="text-sm font-medium"
        >
          Máximo
        </p>
        <input
          class="w-40 border border-gray-300 rounded-md focus:ring-0 focus:border-annie-primary"
          type="text"
          v-model="search.maxValue"
          name="max-value"
          id="max-value"
          v-money="money"
        >
      </label>
      <div
        class="flex items-center space-x-2"
      >
        <p>
          Dormitórios
        </p>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="bedroom_1"
            value="1"
            id="bedroom_1"
            v-model="search.bedrooms"
            @click="checkBedrooms('1')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="bedroom_1"
          >
            <span>1</span>
          </label>
        </div>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="bedroom_2"
            value="2"
            id="bedroom_2"
            v-model="search.bedrooms"
            @click="checkBedrooms('2')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="bedroom_2"
          >
            <span>2</span>
          </label>
        </div>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="bedroom_3"
            value="3"
            id="bedroom_3"
            v-model="search.bedrooms"
            @click="checkBedrooms('3')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="bedroom_3"
          >
            <span>3</span>
          </label>
        </div>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="bedroom_4"
            value="4"
            id="bedroom_4"
            v-model="search.bedrooms"
            @click="checkBedrooms('4')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="bedroom_4"
          >
            <span>+4</span>
          </label>
        </div>
      </div>
      <div
        class="flex items-center space-x-2"
      >
        <p>
          Vagas
        </p>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="garages_1"
            value="1"
            id="garages_1"
            v-model="search.garages"
            @click="checkGarages('1')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="garages_1"
          >
            <span>1</span>
          </label>
        </div>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="garages_2"
            value="2"
            id="garages_2"
            v-model="search.garages"
            @click="checkGarages('2')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="garages_2"
          >
            <span>2</span>
          </label>
        </div>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="garages_3"
            value="3"
            id="garages_3"
            v-model="search.garages"
            @click="checkGarages('3')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="garages_3"
          >
            <span>3</span>
          </label>
        </div>
        <div>
          <input
            class="hidden peer"
            type="radio"
            name="garages_4"
            value="4"
            id="garages_4"
            v-model="search.garages"
            @click="checkGarages('4')"
          />
          <label
            class="flex items-center justify-center w-8 h-8 text-sm font-medium transition-colors border border-gray-100 rounded-full shadow-sm cursor-pointer peer-checked:border-annie-primary hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-annie-primary"
            for="garages_4"
          >
            <span>+4</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VMoney } from 'v-money'

export default {
  name: 'SearchGeneral',

  directives: { money : VMoney },

  data () {
    return {
      typeOfSearch:'comprar',
      search: {
        bedrooms: 0,
        garages: 0,
        minValue: 0,
        maxValue: 0,
        search: ''
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      },
      showFilters: false
    }
  },

  methods: {
    redirectToSearch () {
      const query = {}
      if (this.search.bedrooms) query.bedrooms = this.search.bedrooms
      if (this.search.garages) query.garages = this.search.garages
      if (this.search.search) query.search = this.search.search
      if (this.search.minValue !== 'R$ 0,00') query.minValue = this.search.minValue.replace('R$ ', '')
      if (this.search.maxValue !== 'R$ 0,00') query.maxValue = this.search.maxValue.replace('R$ ', '')
      this.$router.push(
        {
          path: `/${this.typeOfSearch}`,
          query
        }
      )
    },

    checkGarages (selectedValue) {
      if (!this.search.garages) return
      if (selectedValue !== this.search.garages) return
      this.search.garages = 0
    },

    checkBedrooms (selectedValue) {
      if (!this.search.bedrooms) return
      if (selectedValue !== this.search.bedrooms) return
      this.search.bedrooms = 0
    }
  }
}

</script>
