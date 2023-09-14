<template>
  <div class="background">
    <div class="align-center d-flex justify-center " style="height: 100vh">
      <LoginComponent/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LoginComponent from "@/components/LoginComponent";

export default defineComponent({
  name: 'HomeView',

  components: {
    LoginComponent,
  },
});
</script>
<style scoped>
.background {
  background-image: url("../assets/backgroundLogin.jpg");
  height: 100vh;
  position: fixed;
  width: 100%;
}
</style>
