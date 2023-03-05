<template>
  <div class="row my-5 d-flex justify-content-center newHeight">
    <div>
      <div class="col-12 col-md-12 text-light">
        <div class="row d-flex justify-content-center text-light">
          <button @click="filterEvents('')" value="" :class="[filterType == '' ? 'filterButton' : '']"
            class="col-5 m-1 m-md-0 col-md-2 btn text-light">All</button>
          <button @click="filterEvents('concert')" :class="[filterType == 'concert' ? 'filterButton' : '']"
            class="col-5 m-1 m-md-0 col-md-2 btn text-light">Concerts</button>
          <button @click="filterEvents('convention')" :class="[filterType == 'convention' ? 'filterButton' : '']"
            class="col-5 m-1 m-md-0 col-md-2 btn btn-outline text-light">Conventions</button>
          <button @click="filterEvents('exhibits')" :class="[filterType == 'exhibits' ? 'filterButton' : '']"
            class="col-5 m-1 m-md-0 col-md-2 btn text-light">Exhibits</button>
          <button @click="filterEvents('sport')" :class="[filterType == 'sport' ? 'filterButton' : '']"
            class="col-5 m-1 m-md-0 col-md-2 btn text-light">Sports</button>
          <button @click="filterEvents('digital')" :class="[filterType == 'digital' ? 'filterButton' : '']"
            class="col-5 m-1 m-md-0 col-md-2 btn text-light rightButton">Digital</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { eventsService } from "../../services/EventsService"
import { logger } from "../../utils/Logger"
import Pop from "../../utils/Pop"


export default {



  setup() {
    const filterType = ref({})


    return {
      filterType,

      async filterEvents(eventName) {
        try {
          filterType.value = eventName
          logger.log('[EVENT NAME]', eventName)
          await eventsService.filterEvents(eventName)
        } catch (error) {
          console.error(error)
          // @ts-ignore
          Pop.error(('[ERROR]'), error.message)
        }
      }

    }
  }
}
</script>

<style scoped>
.filterButton {
  border-bottom: 5px #faebd7 solid !important;
}

button {
  text-shadow: 1px 1px 1px black;
  border-left: 1px black solid;
  background-color: #474C61;
  border-radius: 0%;
}


.rightButton {
  border-right: 1px black solid
}

.rightButton:hover {
  border-right: 1px black solid
}
</style>
