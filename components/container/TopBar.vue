<template>
  <div
    class="top-0 z-50 flex justify-between w-full h-16 px-2 py-2 shadow-md bg-annie-primary sm:px-6"
  >
    <div
      class="flex items-center w-20 h-full md:hidden text-annie-second"
    >
      <button
        class="focus:outline-none "
        @click="showMenu = !showMenu"
      >
        <svg
          v-if="!showMenu"
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <NuxtLink
      to="/"
      class="flex md:hidden"
    >
      <img
        src="../../assets/logo/logo_branco.png"
        class="h-12"
        alt=""
      >
    </NuxtLink>
    <div
      id="left-menu"
      class="items-center hidden space-x-4 font-medium text-annie-second md:flex"
    >
      <NuxtLink
        to="/"
        class="flex"
      >
        <img
          src="../../assets/logo/logo_branco.png"
          class="h-12"
          alt=""
        >
      </NuxtLink>
      <NuxtLink
        to="/alugar"
      >
        Imóveis para alugar
      </NuxtLink>
      <NuxtLink
        to="/comprar"
      >
        Imóveis para compar
      </NuxtLink>
      <NuxtLink
        to="/lancamentos"
      >
        Lançamentos
      </NuxtLink>
    </div>

    <div
      id="right-menu"
      class="flex items-center w-20 space-x-4 font-medium text-annie-second lg:w-max"
    >
      <NuxtLink
        to="/fale-conosco"
        class="flex space-x-2"
      >
        <span class="text-2xl text-white icon-support_agent"></span>
        <p
          class="hidden lg:block"
        >
          Fale conosco
        </p>
      </NuxtLink>

      <NuxtLink
        to="/favoritos"
        class="text-2xl"
      >
        <div
          v-if="$store.getters.favoriteListLength === 0"
        >
          <span class="icon-favorite_outline"></span>
        </div>
        <div
          v-else
          class="relative flex"
        >
          <span class="icon-favorite"></span>
          <div
            class="absolute flex items-center justify-center w-4 h-4 text-xs text-white border border-white rounded-full left-4 bg-annie-primary -top-1"
          >
            <p>
              {{ $store.getters.favoriteListLength }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- MENU SIDE -->
    <div
      v-if="showMenu"
      class="absolute left-0 z-40 flex w-full p-4 text-lg font-medium bg-white shadow-md top-16 text-annie-primary md:hidden"
    >
      <ul
        class="content-center w-full divide-y"
      >
        <li
          class="py-4"
        >
          <NuxtLink
            to="/alugar"
            @click="showMenu = false"
          >
            Imóveis para alugar
          </NuxtLink>
        </li>
        <li
          class="py-4"
        >
          <NuxtLink
            to="/comprar"
            @click="showMenu = false"
          >
            Imóveis para compar
          </NuxtLink>
        </li>
        <li
          class="py-4"
        >
          <NuxtLink
            to="/lancamentos"
            @click="showMenu = false"
          >
            Lançamentos
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TopBar',

  data () {
    return {
      showMenu: false
    }
  }
}
</script>
