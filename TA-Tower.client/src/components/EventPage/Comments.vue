<template>
  <div class="col-3 col-md-2 d-flex align-items-center my-3">
    <img class="img-fluid avatar" :src="comment.creator.picture" alt="" srcset="">
  </div>
  <div class="col-9 col-md-10 my-2 commentBg">
    <div class="row">
      <div class="col-4">
        <h5>{{ comment.creator.name }}</h5>
      </div>
      <div v-if="comment.isAttending == true" class="col-4">
        <h5 class="isAttending">Is attending</h5>
      </div>
      <div class="col-12">
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../../AppState";


export default {
  props: {
    comment: {
      type: Object, required: true
    }
  },


  setup() {



    return {

    }
  }
}
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  box-shadow: 2px 2px 5px black;
}

.commentBg {
  background-color: white;
  color: black;
  border-radius: 5px;
  box-shadow: 3px 3px 5px black;
}

.isAttending {
  color: blue;
}
</style>
