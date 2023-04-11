<template>
  <nav class="navbar navbar-expand-lg navBarColor d-flex align-items-center py-0 px-3">
    <router-link class="navbar-brand " :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center mt-3">
        <img class="towerImage" alt="logo"
          src="src\assets\img\TowerLogo.png" />
      </div>
    </router-link>
    <button class=" navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="col-2 offset-7" id="navbarText">
      <button class="btn btn-outline text-light pt-4" data-bs-target="#eventModal" data-bs-toggle="modal">Create
        Event</button>

    </div>
    <!-- <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li> -->
    <!-- LOGIN COMPONENT HERE -->
    <div>
      <Login class="pt-4" />
    </div>
  </nav>

  <Modal id="eventModal">
    <EventForm />
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import Login from '../Global/Login.vue';
import EventForm from "../HomePage/EventForm.vue";
export default {
  setup() {
    return {}
  },
  components: { Login, EventForm, Modal }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.navBarColor {
  background-color: #2A2D3A;
}

.towerImage {
  height: 50px;
  width: auto;
  align-self: center;
  padding: 0;
}
</style>
