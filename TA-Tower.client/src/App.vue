<template>
  <header>
    <Navbar />
  </header>
  <main class="container">
    <router-view />
  </main>

</template>

<script>
import { onMounted } from "vue"
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Global/Navbar.vue'
import { accountService } from "./services/AccountService"
import Pop from "./utils/Pop"

export default {
  setup() {
    onMounted(() => {
      getAccount()
    })
    async function getAccount() {
      try {
        const res = await accountService.getAccount()
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
