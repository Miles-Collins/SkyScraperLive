<template>
  <div class="container-fluid">
    <EventBanner />

    <EventFilterBar />

    <div class="row d-flex justify-content-center">
      <div class="col-11">
        <div class="row d-flex justify-content-between">
          <div v-for="e in events" class="col-12 col-sm-6 col-md-6 col-lg-3">
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
import Pop from "../utils/Pop";

export default {
  setup() {
    onMounted(() => {
      getCurrentEvents();
      console.log(todaysDate.getTime())
    });
    const todaysDate = new Date();
    async function getCurrentEvents() {
      try {
        await eventsService.getCurrentEvents();
      }
      catch (error) {
        console.error(error);
        // @ts-ignore
        Pop.error(("[ERROR]"), error.message);
      }
    }
    return {
      events: computed(() => AppState.events),
    };
  },
  components: { EventCard, EventFilterBar, EventBanner }
}
</script>

<style scoped lang="scss">
.footerHeight {
  height: 10vh;
}
</style>
