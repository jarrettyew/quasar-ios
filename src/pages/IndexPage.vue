<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Native Capacitor Auth</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="Email" type="email" />
        <q-input v-model="password" label="Password" type="password" class="q-mt-sm" />
        <div v-if="error" class="text-negative q-mt-xs">{{ error }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Login" @click="login" />
        <q-btn flat label="Sign Up" @click="signup" />
      </q-card-actions>

      <q-separator />

      <q-card-actions align="center">
        <div v-if="user">
          <div>Welcome, {{ user.email }}</div>
          <q-btn flat label="Logout" @click="logout" />
        </div>
        <div v-else>Not signed in</div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FirebaseAuthentication } from 'boot/firebase-auth'

const email = ref('')
const password = ref('')
const user = ref(null)
const error = ref(null)

// watch for native auth state changes
onMounted(async () => {
  // get initial user
  const { user: current } = await FirebaseAuthentication.getCurrentUser()
  user.value = current

  // subscribe to change events
  FirebaseAuthentication.addListener('authStateChange', (state) => {
    user.value = state.user
    error.value = null
  })
})

async function login() {
  error.value = null
  try {
    await FirebaseAuthentication.signInWithEmailAndPassword({
      email: email.value,
      password: password.value,
    })
  } catch (e) {
    error.value = e.message
  }
}

async function signup() {
  error.value = null
  try {
    await FirebaseAuthentication.createUserWithEmailAndPassword({
      email: email.value,
      password: password.value,
    })
  } catch (e) {
    error.value = e.message
  }
}

async function logout() {
  await FirebaseAuthentication.signOut()
}
</script>
