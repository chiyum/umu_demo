<script lang="ts" setup>
import DrawRouter from "@/components/common/layouts/draw-router.vue";
import PageTab from "@/components/common/layouts/page-tab.vue";
import { useSettingStore } from "@/store/app";
import { setLocale } from "@/i18n";
const { locale } = useI18n();
const router = useRouter();
const leftDrawerOpen = ref(false);
const settingStore = useSettingStore();
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const localeOptions = [
  { label: "English", value: "en" },
  { label: "繁體中文", value: "zh-tw" }
];

// 功能快捷按鈕
const shortcuts = [
  {
    icon: "tabler-calendar",
    title: "Calendar",
    subtitle: "Appointments",
    to: { name: "apps-calendar" }
  },
  {
    icon: "tabler-file",
    title: "Invoice App",
    subtitle: "Manage Accounts",
    to: { name: "apps-invoice-list" }
  },
  {
    icon: "tabler-user",
    title: "Users",
    subtitle: "Manage Users",
    to: { name: "apps-user-list" }
  },
  {
    icon: "tabler-layout",
    title: "Dashboard",
    subtitle: "Dashboard Analytics",
    to: { name: "dashboards-analytics" }
  },
  {
    icon: "tabler-settings",
    title: "Settings",
    subtitle: "Account Settings",
    to: {
      name: "pages-account-settings-tab",
      params: { tab: "account" }
    }
  },
  {
    icon: "tabler-help",
    title: "Help Center",
    subtitle: "FAQs & Articles",
    to: { name: "pages-help-center" }
  }
];

// 通知
const notifications = ref([
  {
    id: 1,
    img: "https://cdn.quasar.dev/img/boy-avatar.png",
    title: "Congratulation Flora! 🎉",
    subtitle: "Won the monthly best seller badge",
    time: "Today",
    isSeen: true
  },
  {
    id: 2,
    img: "https://cdn.quasar.dev/img/boy-avatar.png",
    text: "Tom Holland",
    title: "New user registered.",
    subtitle: "5 hours ago",
    time: "Yesterday",
    isSeen: false
  },
  {
    id: 3,
    img: "https://cdn.quasar.dev/img/boy-avatar.png",
    title: "New message received 👋🏻",
    subtitle: "You have 10 unread messages",
    time: "11 Aug",
    isSeen: true
  },
  {
    id: 4,
    img: "https://cdn.quasar.dev/img/boy-avatar.png",
    title: "Paypal",
    subtitle: "Received Payment",
    time: "25 May",
    isSeen: false,
    color: "error"
  },
  {
    id: 5,
    img: "https://cdn.quasar.dev/img/boy-avatar.png",
    title: "Received Order 📦",
    subtitle: "New order received from john",
    time: "19 Mar",
    isSeen: true
  }
]);

const selected_item = ref(-1);
const miniState = ref(false);

const deleteRow = (row) => {
  notifications.value.splice(notifications.value.indexOf(row), 1);
};

const drawerClick = (e) => {
  // if in "mini" state and user
  // click on drawer, we switch it to "normal" mode
  if (miniState.value) {
    miniState.value = false;

    // notice we have registered an event with capture flag;
    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation();
  }
};

const open = (path: string) => {
  console.log("open", path);
};
// const miniState = ref(true);
</script>

<template>
  <q-layout view="lHh LpR lff">
    <q-header
      :class="$q.dark.isActive ? 'q-dark' : 'bg-white'"
      class="shadow_custom q-mx-lg q-mt-md q-py-sm"
      style="right: 8px; border-radius: 4px"
    >
      <q-toolbar class="no-shadow header header-toolbar">
        <div class="header-toolbar-left">
          <q-btn
            flat
            dense
            round
            :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
            aria-label="Menu"
            color="grey"
            class="custom-border"
            @click="toggleLeftDrawer"
          />
        </div>
        <div class="header-toolbar-right">
          <div>
            <q-btn
              class="q-mr-xs"
              :text-color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
              flat
              round
              @click="$q.dark.toggle()"
              :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
            />
            <q-btn round flat color="white">
              <q-avatar
                size="45px"
                :text-color="$q.dark.isActive ? 'grey-5' : 'primary'"
                flat
              >
                <Icon icon="tabler:language-hiragana" />
                <q-menu
                  style="
                    border-radius: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.12);
                  "
                  class="no-shadow"
                >
                  <q-list>
                    <template v-for="lang in localeOptions" :key="lang.label">
                      <q-item
                        clickable
                        @click="setLocale(lang.value)"
                        v-close-popup
                        :class="
                          locale == lang.value ? 'bg-primary text-white' : ''
                        "
                      >
                        <q-item-section>
                          {{ lang.label }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-menu>
              </q-avatar>
            </q-btn>
            <q-btn round flat color="white">
              <q-avatar
                size="45px"
                :text-color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
                flat
              >
                <Icon icon="tabler:category" />
                <q-menu
                  class="card_style no-shadow"
                  style="border: 1px solid rgba(0, 0, 0, 0.12)"
                >
                  <q-card
                    class="no-shadow"
                    style="max-width: 340px; max-height: 560px"
                  >
                    <q-card-section>
                      <div
                        class="text-h6"
                        :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                      >
                        Shortcuts

                        <q-btn class="float-right" flat dense v-close-popup>
                          <q-avatar size="35px">
                            <Icon icon="tabler-category-2" />
                          </q-avatar>
                        </q-btn>
                      </div>
                    </q-card-section>

                    <q-separator />

                    <div class="row">
                      <div
                        v-for="(shortcut, index) in shortcuts"
                        :key="shortcut.title"
                        class="col-lg-6 col-md-6 col-xs-6 col-sm-6 q-pa-md text-center cursor-pointer shortcut-icon"
                        :class="(index + 1) % 2 ? 'border-e' : ''"
                      >
                        <q-avatar
                          :color="$q.dark.isActive ? 'grey-9' : 'grey-2'"
                          size="48px"
                        >
                          <Icon :icon="shortcut.icon" />
                        </q-avatar>

                        <div
                          class="q-mt-md font-weight-medium"
                          :class="
                            $q.dark.isActive ? 'dark_text' : 'text-grey-8'
                          "
                        >
                          {{ shortcut.title }}
                        </div>
                        <span
                          class="text-sm"
                          :class="
                            $q.dark.isActive ? 'dark_text' : 'text-grey-8'
                          "
                          >{{ shortcut.subtitle }}</span
                        >
                      </div>
                    </div>
                  </q-card>
                </q-menu>
              </q-avatar>
            </q-btn>
            <q-btn round flat color="white" id="notification-btn">
              <q-avatar
                size="45px"
                :text-color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
                flat
              >
                <Icon icon="tabler:bell-filled" />
                <q-badge floating color="red">2</q-badge>
                <q-menu
                  class="card_style no-shadow"
                  style="border: 1px solid rgba(0, 0, 0, 0.12)"
                >
                  <q-card
                    class="no-shadow"
                    style="min-width: 360px; max-height: 560px"
                  >
                    <q-card-section>
                      <div
                        class="text-h6"
                        :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                      >
                        Notifications

                        <q-btn class="float-right" flat dense v-close-popup>
                          <q-avatar size="35px">
                            <Icon icon="tabler-inbox" />
                          </q-avatar>
                          <q-tooltip> Mark all As Read </q-tooltip>
                        </q-btn>
                      </div>
                    </q-card-section>

                    <q-separator />
                    <template
                      v-for="(
                        notification, notification_index
                      ) in notifications"
                      :key="notification.title"
                    >
                      <q-item
                        @mouseover="selected_item = notification_index"
                        @mouseleave="selected_item = -1"
                      >
                        <q-item-section avatar>
                          <q-avatar>
                            <img :src="notification.img" alt="" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ notification.title }}</q-item-label>
                          <q-item-label caption>{{
                            notification.subtitle
                          }}</q-item-label>
                          <q-item-label caption>{{
                            notification.time
                          }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-btn
                            icon="close"
                            v-if="notification_index === selected_item"
                            class="q-mt-xs"
                            flat
                            dense
                            @click="deleteRow(notification)"
                          ></q-btn>
                          <q-badge
                            color="primary"
                            class="q-mr-sm"
                            rounded
                            v-if="!notification.isSeen"
                          ></q-badge>
                        </q-item-section>
                      </q-item>
                    </template>
                    <q-card-section class="q-pa-xs">
                      <q-btn
                        outline
                        flat
                        no-caps
                        label="View Call Notifications"
                        color="primary"
                        class="full-width"
                      ></q-btn>
                    </q-card-section>
                  </q-card>
                </q-menu>
              </q-avatar>
            </q-btn>
          </div>

          <div class="q-mx-sm">
            <q-avatar class="cursor-pointer">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg" alt="" />

              <q-badge rounded color="green" class="" floating />
              <q-menu
                class="no-shadow card_style"
                style="border: 1px solid rgba(0, 0, 0, 0.12)"
              >
                <q-list style="min-width: 200px" class="no-shadow">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar>
                        <img
                          src="https://cdn.quasar.dev/img/avatar3.jpg"
                          alt=""
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>John Doe</q-item-label>
                      <q-item-label caption>Admin</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup to="/user_view">
                    <q-item-section side>
                      <q-avatar rounded size="35px">
                        <Icon icon="tabler:user" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Profile</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup to="/account-settings">
                    <q-item-section side>
                      <q-avatar rounded size="35px">
                        <Icon icon="tabler:credit-card" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Billing</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup to="/help-center">
                    <q-item-section side>
                      <q-avatar rounded size="35px">
                        <Icon icon="tabler:help" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Help</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup to="/pricing">
                    <q-item-section side>
                      <q-avatar rounded size="35px">
                        <Icon icon="tabler:currency-dollar" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Pricing</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup to="/faq">
                    <q-item-section side>
                      <q-avatar rounded size="35px">
                        <Icon icon="tabler:help" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Faq</q-item-section>
                  </q-item>
                  <!--                  <q-separator />-->
                  <q-item
                    @click="router.push('/login_cover')"
                    clickable
                    v-close-popup
                  >
                    <q-item-section side>
                      <q-avatar rounded size="35px" icon="logout" />
                    </q-item-section>
                    <q-item-section>Logout</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section side>
                      <q-avatar rounded size="35px">
                        <Icon icon="tabler:settings" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section class="flex align-center row">
                      <div>{{ $t("header.tab.toggle") }}</div>
                      <div>
                        <q-toggle
                          v-model="settingStore.state.useTabKeepAliveAction"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-avatar>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="290"
      :mini-width="80"
      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"
      :class="$q.dark.isActive ? '' : 'drawer_cls'"
    >
      <div style="height: calc(100% - 80px); padding: 10px">
        <q-toolbar
          @click="router.push('/')"
          class="cursor-pointer"
          style="margin-top: 15px"
        >
          <q-avatar rounded>
            <div style="line-height: 0" class="text-primary">
              <q-avatar size="32px">
                <img
                  v-if="!$q.dark.isActive"
                  alt=""
                  src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
                />
                <img
                  v-else
                  alt=""
                  src="https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg"
                />
              </q-avatar>
            </div>
          </q-avatar>

          <q-toolbar-title
            style="font-size: 1.4rem; letter-spacing: -0.5px"
            class="text-weight-medium"
            :class="$q.dark.isActive ? 'dark_text' : 'quasar_color'"
          >
            Quasar Framework
          </q-toolbar-title>
        </q-toolbar>
        <q-scroll-area style="height: 100%">
          <q-list padding>
            <DrawRouter />
          </q-list>
        </q-scroll-area>
      </div>
      <div class="q-mini-drawer-hide absolute" style="top: 30px; right: -17px">
        <q-btn
          dense
          round
          style="
            background-color: #696cff;
            color: white;
            border: 6px solid #f2f2f7;
          "
          unelevated
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <!-- 對齊 custom-service-admin 的滾動結構：
           q-page 用 column + overflow:hidden 把可用高度撐滿 viewport，
           內部 div 走 col + relative-position 提供定位錨點，
           q-scroll-area 用 absolute-full 緊貼父層四邊，
           滿足 q-scroll-area 需要明確高度才能正常滾動的要求 -->
      <q-page class="column" style="overflow: hidden">
        <q-page-sticky
          position="top-left"
          :offset="[24, 24]"
          style="z-index: 50"
          v-if="settingStore.state.useTabKeepAliveAction"
        >
          <page-tab />
        </q-page-sticky>
        <div class="col relative-position">
          <q-scroll-area
            class="absolute-full q-pr-sm q-scrollarea--only-vertical page-wrap"
            :class="{
              'page-wrap--tab-state': settingStore.state.useTabKeepAliveAction
            }"
            visible
          >
            <div class="q-pa-lg q-mt-md page-main">
              <slot />
            </div>
          </q-scroll-area>
        </div>
      </q-page>
    </q-page-container>
    <q-footer
      class="bg-transparent layout-footer q-pa-sm"
      :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
    >
    </q-footer>
  </q-layout>
</template>
