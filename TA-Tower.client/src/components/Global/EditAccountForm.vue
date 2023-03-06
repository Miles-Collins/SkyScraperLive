<template>
  <form @submit.prevent="handleSubmit" action="">
    <div>
      <h1>Edit Account</h1>
    </div>
    <div>
      <label for="name">Name:</label>
      <input class="form-control" v-model="editable.name" name="name" type="text">
    </div>
    <div>
      <label for="email">Email:</label>
      <input class="form-control" name="email" v-model="editable.email" type="text">
    </div>
    <div>
      <label for="profilePicture">Profile Picture:</label>
      <input class="form-control" v-model="editable.picture" name="profilePicture" type="text">
    </div>
    <div>
      <button data-bs-dismiss="modal" class="col-12 pt-3 btn btn-outline">
        <h2>Submit</h2>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { AppState } from "../../AppState";
import { accountService } from "../../services/AccountService";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";


export default {



  setup() {
    const editable = ref({})


    return {
      editable,
      async handleSubmit() {
        try {
          logger.log('[EDITED ACCOUNT DATA]', editable.value);
          await accountService.editAccount(editable.value)
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

<style></style>
