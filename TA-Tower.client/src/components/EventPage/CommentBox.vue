<template>
  <div class="row m-0 p-0 mt-2">
    <h6 class="textColor text-start">What are people saying</h6>
  </div>
  <div class="row commentBg mb-5 d-flex justify-contents-center">
    <div class="col-11 mx-auto mt-4">
      <h5 class="text-end textColorGreen">Join the conversation</h5>
    </div>
    <CommentForm />
    <div v-for="c in comments" class="row d-flex justify-content-center">
      <Comments :comment="c" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";
import CommentForm from "./CommentForm.vue";
import Comments from "./Comments.vue";


export default {
  setup() {
    return {
      comments: computed(() => AppState.eventComments)
    };
  },
  components: { Comments, CommentForm }
}
</script>

<style scoped>
.commentBg {
  background-color: #474C61;
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.437);
}

.textColor {
  color: #7981A6;
  text-shadow: 1px 1px 1px black;
}

.textColorGreen {
  color: #79E6AB;
  text-shadow: 1px 1px 1px black;
}

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
