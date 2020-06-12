<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <Login></Login>
    </v-container>
  </v-content>
</template>

<script>
// @ is an alias to /src
import Login from "@/modules/client/auth/components/Login";

export default {
  name: "Auth",
  components: {
    Login,
  },
};
</script>
