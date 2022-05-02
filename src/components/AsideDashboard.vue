<template>
  <div class="sidebar">
    <div class="logo-details">
      <i class="bx bxs-cog icon me-1"></i>
      <div class="logo_name">CustoManager</div>
      <i class="bx bx-menu" id="btn" @click="close(), clickfun()"></i>
    </div>
    <ul class="nav-list">
      <li>
        <a href="/dashboard">
          <i class="bx bx-grid-alt"></i>
          <span class="links_name">Dashboard</span>
        </a>
        <span class="tooltip">Dashboard</span>
      </li>
      <li>
        <a href="/usuarios">
          <i class="bx bx-user"></i>
          <span class="links_name">Usuários</span>
        </a>
        <span class="tooltip">Usuários</span>
      </li>
      <!-- <li>
        <a href="#">
          <i class="bx bx-chat"></i>
          <span class="links_name">Messages</span>
        </a>
        <span class="tooltip">Messages</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-pie-chart-alt-2"></i>
          <span class="links_name">Analytics</span>
        </a>
        <span class="tooltip">Analytics</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-folder"></i>
          <span class="links_name">File Manager</span>
        </a>
        <span class="tooltip">Files</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-cart-alt"></i>
          <span class="links_name">Order</span>
        </a>
        <span class="tooltip">Order</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-heart"></i>
          <span class="links_name">Saved</span>
        </a>
        <span class="tooltip">Saved</span>
      </li>
      <li>
        <a href="#">
          <i class="bx bx-cog"></i>
          <span class="links_name">Setting</span>
        </a>
        <span class="tooltip">Setting</span>
      </li> -->
      <li class="profile">
        <div class="profile-details">
          <img src="" alt="profileImg" />
          <div class="name_job">
            <div class="name">Adriano Kenji</div>
            <div class="job">Full Stack Developer</div>
          </div>
        </div>
        <i class="bx bx-log-out" id="log_out" @click="logout()"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  name: "HeaderDash",
  setup() {
    const route = useRouter();

    const sidebar = ref(".sidebar");
    const closeBtn = ref("#btn");
    const searchBtn = ref(".bx-search");

    const methods = reactive({
      close() {
        let sidebar = document.querySelector(".sidebar");

        sidebar.classList.toggle("open");
        methods.menuBtnChange();
      },

      clickfun() {
        $("#wrapper").toggleClass("toggled");
      },

      search() {
        let sidebar = document.querySelector(".sidebar");

        sidebar.classList.toggle("open");
        methods.menuBtnChange();
      },

      menuBtnChange() {
        let sidebar = document.querySelector(".sidebar");

        if (sidebar.classList.contains("open")) {
          closeBtn.value.replace("bx-menu", "bx-menu-alt-right");
        } else {
          closeBtn.value.replace("bx-menu-alt-right", "bx-menu");
        }
      },

      logout() {
        localStorage.removeItem("token");
        route.push("/");
      },
    });

    return {
      route,
      sidebar,
      closeBtn,
      searchBtn,
      ...toRefs(methods),
    };
  },
};
</script>

<style>
@import "@/styles/AsideDashboard.css";

#wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  overflow-x: hidden;
}

#page-content-wrapper {
  width: 100%;
  padding: 15px;
  margin-left: 60px;
  transition: all 0.5s ease;
}

#wrapper.toggled #page-content-wrapper {
  margin-left: 240px;
  transition: all 0.5s ease;
}
</style>