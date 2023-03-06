<template>
  <div class="container-fluid">
    <EventBanner />

    <EventFilterBar />

    <div class="row d-flex justify-content-center mt-2">
      <h1 class="fontColor text-center text-md-start"><u>Upcoming Events</u></h1>
      <h6 class="fontColor text-center text-md-start mt-5 mt-md-0" v-if="!events[0]">There are currently no upcoming
        Events.</h6>
      <div class="col-11">
        <div class="row mt-2">
          <div v-for="e in events" class="col-12 col-sm-6 col-md-6 col-lg-3">
            <EventCard :event="e" />
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-5">
      <h1 class="fontColor text-center text-md-start"><u>Past Events</u></h1>
      <div class="col-11">
        <div class="row">
          <div v-for="e in pastEvents" class="col-12 col-sm-6 col-md-6 col-lg-3">
            <EventCard :event="e" />
          </div>
        </div>
      </div>
    </div>

    <footer class="footerHeight">

    </footer>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { computed } from 'vue';
import { AppState } from "../AppState";
import EventBanner from "../components/HomePage/EventBanner.vue";
import EventCard from "../components/HomePage/EventCard.vue";
import EventFilterBar from "../components/HomePage/EventFilterBar.vue";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {
    onMounted(() => {
      getCurrentEvents();
      logger.log(todaysDate.getTime())
    });
    const todaysDate = new Date();

    async function getCurrentEvents() {
      try {
        await eventsService.getCurrentEvents();
      }
      catch (error) {
        logger.error(error);
        // @ts-ignore
        Pop.error(("[ERROR]"), error.message);
      }
    }
    return {
      events: computed(() => AppState.currentEvents),
      pastEvents: computed(() => AppState.pastEvents),
    };
  },
  components: { EventCard, EventFilterBar, EventBanner }
}
</script>

<style scoped lang="scss">
.footerHeight {
  height: 10vh;
}

.fontColor {
  color: antiquewhite;
  text-shadow: 2px 1px 2px black;
}
</style>
