<template>
  <form class="text-center" @submit.prevent="handleSubmit" action="">
    <textarea v-model="editable.body" name="comment" id="" class="col-11" rows="5"
      placeholder="Tell the people..."></textarea>
    <div class="col-11 mx-auto text-end mt-2 mb-3">
      <button type="submit" class="btn btn-outline-dark postButton">Post Comment</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import Pop from "../../utils/Pop";
import { commentsService } from "../../services/CommentsService"
import { AppState } from "../../AppState";

export default {
  props: { event: { type: Object, required: true } },


  setup(props) {
    let editable = ref({})


    return {
      editable,
      async handleSubmit() {
        try {
          console.log('[EVENT ID]', AppState.activeEvent.id);
          editable.value.eventId = AppState.activeEvent.id
          console.log('[COMMENT]', editable.value);
          await commentsService.createComment(editable.value)
          ref = {}
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

<style>
.postButton {
  background-color: #79E6AB;
  color: black;
  box-shadow: 2px 2px 5px black;
}

textarea {
  border-radius: 5px;
  box-shadow: 3px 3px 5px;
}
</style>
