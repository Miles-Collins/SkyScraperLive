<template>
  <div v-if="event" class="mt-5 d-none d-md-block">
    <div :style="{ backgroundImage: `url(${event.coverImg})` }" class="row rowHeight mx-auto">
      <div class="col-12 text-light autoHeight">
        <div class="row cardHeight">
          <!-- LEFT HALF -->
          <div class="col-4 d-flex align-items-center">
            <img class="cardHeight my-4" :src="event.coverImg" alt="" srcset="">
          </div>
          <!-- RIGHT HALF -->
          <div class="col-8">
            <div v-if="event.creatorId == account.id" class="row">
              <div type="button" id="eventToggle" data-bs-toggle="dropdown"
                class="col-1 offset-11 text-end dropdown-toggle">
                <i class="mdi mdi-dots-horizontal"></i>
              </div>
              <ul class="dropdown-menu dropdown-menu-dark col-2" aria-labelledby="eventToggle">
                <li><a class="dropdown-item" href="#">Edit Event</a></li>
                <li><a @click="cancelEvent" class="dropdown-item" href="#">Cancel Event</a></li>
                <li><a @click="deleteEvent" class="dropdown-item" href="#">Delete Event</a></li>
              </ul>
            </div>
            <div class="row headerHeight">
              <!-- <div v-if="event.creatorId == account.id" class="col-12 text-end dropdown">
                <button type="button" id="eventToggle" data-bs-toggle="dropdown" class="btn dropdown-toggle"><i
                    class="mdi mdi-dots-horizontal"></i></button>
              </div> -->
              <div class="col-6 text-start mt-3">
                <span class="">{{ event.name }}</span>
              </div>
              <div class="col-6 text-end mt-3">
                <span class="">{{ new
                  Date(event.startDate).toDateString('en-us')
                }}</span>
              </div>
              <div class="col-6 text-start">
                <h6>{{ event.location }}</h6>
              </div>
              <div class="col-6 text-end">
                <span class="">Starting at {{ new
                  Date(event.startDate).toLocaleTimeString('en-us')
                }}</span>
              </div>
            </div>
            <div class="row bodyHeight">
              <div class="col-12 mt-5">
                <p>{{ event.description }}</p>
              </div>
            </div>
            <div class="row fillerHeight">
            </div>
            <div class="row footerHeight">
              <div v-if="event.capacity != 0 && event.isCanceled == false" class="col-6 text-start">
                <h6><span class="blue">{{ event.capacity }}</span> tickets left.</h6>
              </div>
              <div v-if="event.isCanceled == true" class="col-6 text-start">
                <h6 class="text-danger">{{ event.name }} {{ event.location }} has been cancelled.</h6>
              </div>
              <div v-if="event.capacity == 0" class="col-6 text-start">
                <h6 class="text-danger">{{ event.name }} {{ event.location }} is SOLD OUT!</h6>
              </div>
              <div v-if="!isAttending && event.capacity != 0 && event.isCanceled == false" class="col-6 text-end">
                <button @click="createTicket" class="btn btn-warning">Reserve <i
                    class="mdi mdi-account-check"></i></button>
              </div>
              <div v-if="isAttending && event.isCanceled == false" class="col-6 text-end">
                <button @click="deleteTicket" class="btn btn-warning">Unreserve <i
                    class="mdi mdi-account-check"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="event" class="mt-5 d-block d-md-none">
    <div :style="{ backgroundImage: `url(${event.coverImg})` }" class="row  mx-auto">
      <div class="col-12 text-light autoHeight">
        <div class="row ">
          <div class="col-6 text-start mt-3">
            <span class="">{{ event.name }}</span>
          </div>
          <div class="col-6 text-end mt-3">
            <span class="">{{ new
              Date(event.startDate).toDateString('en-us')
            }}</span>
          </div>
          <div class="col-6 text-start">
            <h6>{{ event.location }}</h6>
          </div>
          <div class="col-6 text-end">
            <span class="">Starting at {{ new
              Date(event.startDate).toLocaleTimeString('en-us')
            }}</span>
          </div>
          <!-- LEFT HALF -->
          <div class="col-12 d-flex align-items-center">
            <img class="cardHeight my-4" :src="event.coverImg" alt="" srcset="">
          </div>
          <!-- RIGHT HALF -->
          <div class="col-12">
            <div v-if="event.creatorId == account.id" class="row">
              <div type="button" id="eventToggle" data-bs-toggle="dropdown"
                class="col-1 offset-10 text-end dropdown-toggle">
                <i class="mdi mdi-dots-horizontal"></i>
              </div>
              <ul class="dropdown-menu dropdown-menu-dark col-2" aria-labelledby="eventToggle">
                <li><a class="dropdown-item" href="#">Edit Event</a></li>
                <li><a @click="cancelEvent" class="dropdown-item" href="#">Cancel Event</a></li>
                <li><a @click="deleteEvent" class="dropdown-item" href="#">Delete Event</a></li>
              </ul>
            </div>
            <div class="row">
              <div class="col-12">
                <p>{{ event.description }}</p>
              </div>
            </div>

            <div class="row">
              <div v-if="event.capacity != 0 && event.isCanceled == false" class="col-6 text-start">
                <h6><span class="blue">{{ event.capacity }}</span> tickets left.</h6>
              </div>
              <div v-if="event.isCanceled == true" class="col-6 text-start">
                <h6 class="text-danger">{{ event.name }} {{ event.location }} has been cancelled.</h6>
              </div>
              <div v-if="event.capacity == 0" class="col-6 text-start">
                <h6 class="text-danger">{{ event.name }} {{ event.location }} is SOLD OUT!</h6>
              </div>
              <div v-if="!isAttending && event.capacity != 0 && event.isCanceled == false" class="col-6 text-end mb-3">
                <button @click="createTicket" class="btn btn-warning">Reserve <i
                    class="mdi mdi-account-check"></i></button>
              </div>
              <div v-if="isAttending && event.isCanceled == false" class="col-6 text-end mb-3">
                <button @click="deleteTicket" class="btn btn-warning">Unreserve <i
                    class="mdi mdi-account-check"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../../AppState";
import { eventsService } from "../../services/EventsService";
import { ticketsService } from "../../services/TicketsService";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";


export default {



  setup() {
    const route = useRoute()


    return {
      route,
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      isAttending: computed(() => AppState.ticketHolders.find(t => t.creatorId = AppState.account.id)),

      async createTicket() {
        try {
          logger.log('[EVENT ROUTE ID]', route.params.id)
          const res = await ticketsService.createTicket(route.params.id)
        } catch (error) {
          logger.error(error)
          // @ts-ignore
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async deleteTicket() {
        try {
          logger.log('[TICKET ID]', this.isAttending.id)
          const ticketId = this.isAttending.id
          await ticketsService.deleteTicket(ticketId)
        } catch (error) {
          logger.error(error)
          // @ts-ignore
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async cancelEvent() {
        try {
          let eventId = route.params.id
          await eventsService.cancelEvent(eventId)
        } catch (error) {
          logger.error(error)
          // @ts-ignore
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async deleteEvent() {
        try {
          let eventId = route.params.id
          await eventsService.deleteEvent(eventId)
        } catch (error) {
          logger.error(error)
          // @ts-ignore
          Pop.error(('[ERROR]'), error.message)
        }
      }
    }
  }
}

</script>

<style scoped>
.rowHeight {
  height: 55vh;
  width: 100%;
  background-position: center;
  object-fit: cover;
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 10px;
  position: relative;
  box-shadow: 5px 15px 10px black;
}

.autoHeight {
  height: 100%;
  background: rgba(59, 50, 97, 0.29);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.6px);
  -webkit-backdrop-filter: blur(7.6px);
  color: white;
  text-shadow: 2px 1px 2px black;
}

.cardHeight {
  height: 100%;
  width: 100%;
  object-fit: contain;
}


.headerHeight {
  height: 10%;
}

.bodyHeight {
  height: 50%
}

.fillerHeight {
  height: 15%;
}

.footerHeight {
  height: 15%;
}

.blue {
  color: #56c7fb;
}
</style>
