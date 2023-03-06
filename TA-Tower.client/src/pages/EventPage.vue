<template>
  <div class="container">
    <EventCard />
  </div>

  <div class="container mt-5 ">
    <h5 class="textColor">See who's attending</h5>
    <div class="row avatarBarBg">
      <div class="col-2 col-md-1 px-0 d-flex justify-content-center" v-for="th in ticketHolders">
        <AvatarBar :ticketHolder="th" />
      </div>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-11 col-md-8 mx-auto">
      <CommentBox />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";
import { computed } from 'vue';
import { AppState } from "../AppState";
import EventCard from "../components/EventPage/EventCard.vue";
import AvatarBar from "../components/EventPage/AvatarBar.vue";
import { logger } from "../utils/Logger";
import CommentBox from "../components/EventPage/CommentBox.vue";
import { accountService } from "../services/AccountService";


export default {
  setup() {
    onMounted(() => {
      logger.log('[ACCOUNT INFO]', AppState.account);
      getEvent();
      getTicketHolders()
      getAccount()
      getEventComments()
    });
    const route = useRoute();
    // MADE VARIABLE FOR THE EVENT ID
    const eventId = route.params.id
    async function getEvent() {
      try {
        logger.log("[EVENT ROUTE ID]", route.params);
        // SETTING VARIABLE FOR ROUTE PARAMS -CLEANER CODE-
        let eventId = route.params.id;
        await eventsService.getEventById(eventId);
      }
      catch (error) {
        logger.error(error);
        // @ts-ignore
        Pop.error(("[ERROR]"), error.message);
      }
    }
    async function getTicketHolders() {
      try {
        logger.log('[EVENT ID]', eventId)
        await eventsService.getTicketHolders(eventId)
      } catch (error) {
        logger.error(error)
        // @ts-ignore
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getEventComments() {
      try {
        await eventsService.getEventComments(eventId)
      } catch (error) {
        logger.error(error)
        // @ts-ignore
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getAccount() {
      try {
        await accountService.getAccount()
      } catch (error) {
        logger.error(error)
        // @ts-ignore
        Pop.error(('[ERROR]'), error.message)
      }
    }
    return {
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      ticketHolders: computed(() => AppState.ticketHolders),
      isAttending: computed(() => AppState.ticketHolders.find(t => t.creatorId = AppState.account.id)),
    };
  },
  components: { EventCard, AvatarBar, CommentBox }
}
</script>

<style scoped>
.avatarBarBg {
  background-color: #474C61;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.437);
  border-radius: 5px;
}

.textColor {
  color: #7981A6;
  text-shadow: 1px 1px 1px black;
}
</style>
