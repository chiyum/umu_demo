<script lang="ts" setup>
interface State {
  username: string;
  email: string;
  password: string;
  remember_me: boolean;
}
const remember_me = ref(false);
const router = useRouter();
const state: State = reactive({
  username: "",
  email: "",
  password: "",
  remember_me: false
});
</script>
<template>
  <div class="main_bg">
    <div class="row" style="height: 100vh">
      <div v-if="!$q.screen.lt.sm" class="col-8 q-pa-lg">
        <div
          style="background: #f8f7fa; height: 100%; border-radius: 15px"
          class="flex flex-center relative-position"
        >
          <img
            alt=""
            style="height: 450px"
            src="@/assets/images/illustrations/auth-register-illustration-light.png"
          />
          <img
            alt=""
            style="
              position: absolute;
              overflow-clip-margin: content-box;
              width: 100%;
              bottom: 0%;
              left: 0%;
              height: 35%;
            "
            src="@/assets/images/illustrations/bg-shape-image-light.png"
          />
        </div>
      </div>
      <div :class="$q.screen.lt.sm ? 'col-12' : 'col-4'">
        <q-card flat class="">
          <div>
            <q-card-section class="q-px-lg">
              <div class="row q-mt-md">
                <q-toolbar-title
                  @click="router.push('/home')"
                  style="
                    color: #566a7f;
                    font-size: 1.6rem;
                    letter-spacing: -0.5px;
                  "
                  class="text-weight-medium cursor-pointer"
                >
                  <span class="text-primary">
                    <q-avatar size="32px">
                      <img
                        alt=""
                        src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
                      />
                    </q-avatar>
                  </span>
                </q-toolbar-title>
              </div>
              <div
                style="font-size: 23px"
                class="row q-mt-lg text-grey-8 text-weight-medium"
              >
                Adventure starts here 🚀
              </div>
              <div
                style="color: #697a8d; font-size: 15px"
                class="text-caption q-mt-xs"
              >
                Make your app management easy and fun!
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-px-sm">
                <q-item-label
                  :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                  >Username</q-item-label
                >
                <q-input
                  v-model="state.username"
                  dense
                  class="q-py-sm"
                  outlined
                  label="Enter your username"
                />
                <q-item-label
                  class="q-mt-md"
                  :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                  >Email
                </q-item-label>
                <q-input
                  v-model="state.email"
                  dense
                  class="q-py-sm"
                  outlined
                  label="Enter your email"
                />
                <q-item-label
                  class="q-mt-md"
                  :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                  >Password
                </q-item-label>
                <q-input
                  v-model="state.password"
                  dense
                  class="q-py-sm"
                  type="password"
                  outlined
                  label="Enter password"
                />
              </div>
              <div class="q-py-sm q-pa-none text-grey-9">
                <q-checkbox v-model="remember_me" />
                I agree to
                <span class="text-primary">privacy policy & terms</span>
              </div>
              <div class="row q-px-sm">
                <q-btn
                  class="full-width"
                  label="Sign Up"
                  to="/"
                  type="button"
                  color="primary"
                />
              </div>
              <div class="q-ma-md text-center text-grey-8">
                Already have an account?
                <q-btn
                  @click="router.push('/login')"
                  flat
                  dense
                  class="text-capitalize text-primary"
                  label="Sign in instead"
                />
              </div>
              <div class="divider my-4">
                <div class="divider-text text-grey-8">or</div>
              </div>
              <div class="text-center q-pb-md q-pt-sm">
                <q-avatar
                  size="38px"
                  square
                  class="rounded-borders"
                  style="background: #e0e4ef"
                >
                  <Icon icon="tabler:brand-facebook-filled" alt="Avatar" />
                </q-avatar>
                <q-avatar
                  size="38px"
                  square
                  class="rounded-borders q-ml-md"
                  style="background: #fae2df"
                >
                  <Icon icon="tabler:brand-google" alt="Avatar" />
                </q-avatar>
                <q-avatar
                  size="38px"
                  square
                  class="rounded-borders q-ml-md"
                  style="background: #dbf0fd"
                >
                  <Icon icon="tabler:brand-twitter-filled" alt="Avatar" />
                </q-avatar>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style>
.shadow_custom {
  box-shadow: 0 0.25rem 1.125rem rgba(75, 70, 92, 0.1) !important;
}

.divider {
  display: block;
  text-align: center;
  margin: 1rem 0;
  overflow: hidden;
  white-space: nowrap;
}

.divider .divider-text {
  position: relative;
  display: inline-block;
  font-size: 0.8rem;
  padding: 0 1rem;
}

.divider .divider-text i {
  font-size: 1.25rem;
}

.divider .divider-text::before,
.divider .divider-text::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 100vw;
  border-top: 1px solid rgba(75, 70, 92, 0.2);
}

.divider .divider-text::before {
  right: 100%;
}

.divider .divider-text::after {
  left: 100%;
}
</style>
