<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card style="min-width: 350px">
      <!-- … your email/password form … -->

      <q-separator />

      <q-card-actions align="center" class="q-mt-sm">
        <q-btn flat icon="mdi-google" label="Sign in with Google" @click="loginGoogle" />
      </q-card-actions>

      <q-separator />

      <q-card-actions align="center">
        <div v-if="user">
          Welcome, {{ user.email }}<br />
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

const user = ref(null)
const error = ref(null)

onMounted(async () => {
  const { user: current } = await FirebaseAuthentication.getCurrentUser()
  user.value = current
  FirebaseAuthentication.addListener('authStateChange', (s) => {
    user.value = s.user
    error.value = null
  })
})

async function loginGoogle() {
  error.value = null
  try {
    const res = await FirebaseAuthentication.signInWithGoogle()
    user.value = res.user
  } catch (e) {
    error.value = e.message
  }
}

async function logout() {
  await FirebaseAuthentication.signOut()
}
</script>
