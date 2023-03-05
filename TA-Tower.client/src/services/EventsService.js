import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class EventsService {
  async getEvents() {
    const res = await api.get("api/events");
    console.log("[ALL EVENTS]", res.data);
    AppState.events = res.data;
  }

  async getCurrentEvents() {
    const todaysDate = new Date().getTime();
    const res = await api.get("api/events");
    let events = res.data;
    console.log("[CURRENT EVENTS]", events);
    events.forEach((event) => {
      event.startDate = new Date(event.startDate).getTime();
      // console.log(event.startDate);
      if (
        event.startDate > todaysDate &&
        !AppState.currentEvents.some((event) => event.id == event.id)
      ) {
        AppState.currentEvents.push(event);
      } else if (
        !AppState.currentEvents.some((event) => event.id == event.id)
      ) {
        AppState.pastEvents.push(event);
      }
    });
  }

  async filterEvents(eventName) {
    await this.getCurrentEvents();
    if (eventName != "all") {
      let filter = AppState.currentEvents.filter((event) =>
        eventName ? event.type == eventName : true
      );
      logger.log("[FILTERED EVENTS]", filter);
      AppState.currentEvents = filter;
      let filterOldEvents = AppState.pastEvents.filter((event) =>
        eventName ? event.type == eventName : true
      );
      logger.log("[FILTERED EVENTS]", filterOldEvents);
      AppState.pastEvents = filterOldEvents;
    }
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`);
    logger.log("[EVENT BY ID]", res.data);
    AppState.activeEvent = res.data;
  }

  async getTicketHolders(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`);
    logger.log("[TICKET HOLDERS]", res.data);
    AppState.ticketHolders = res.data;
    logger.log("[TICKET HOLDERS APPSTATE]", AppState.ticketHolders);
  }

  async getEventComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    logger.log("[EVENT COMMENTS]", res.data);
    AppState.eventComments = res.data;
  }

  async getEventsByAccountId(accountId) {
    const res = await api.get("api/events");
    logger.log("[MY ID]", accountId);
    let events = res.data.filter((event) => event.creatorId != accountId);

    logger.log(events);
    AppState.yourEvents = res.data.filter(
      (event) => event.creatorId != accountId
    );
    AppState.yourEvents = AppState.yourEvents;
  }

  async createEvent(eventBody) {
    const res = await api.post("api/events", eventBody);
    console.log("[CREATED EVENT]", res.data);
    AppState.currentEvents.unshift(res.data);
    return res.data;
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`);
    console.log("[DELETED EVENT]", res.data);
    AppState.events = AppState.events.filter((events) => events.id != eventId);
    AppState.events.push(res.data);
  }
  async deleteEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}/delete`);
    console.log("[DELETED EVENT]", res.data);
    AppState.events = AppState.events.filter((events) => events.id != eventId);
  }
}

export const eventsService = new EventsService();
