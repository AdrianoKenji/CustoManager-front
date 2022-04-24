<template>
  <!-- <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <svg
          class="bd-placeholder-img"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="#777" />
        </svg>

        <div class="container">
          <div class="carousel-caption text-start">
            <h1>Example headline.</h1>
            <p>
              Some representative placeholder content for the first slide of the
              carousel.
            </p>
            <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <svg
          class="bd-placeholder-img"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="#777" />
        </svg>

        <div class="container">
          <div class="carousel-caption">
            <h1>Another example headline.</h1>
            <p>
              Some representative placeholder content for the second slide of
              the carousel.
            </p>
            <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <svg
          class="bd-placeholder-img"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="#777" />
        </svg>

        <div class="container">
          <div class="carousel-caption text-end">
            <h1>One more for good measure.</h1>
            <p>
              Some representative placeholder content for the third slide of
              this carousel.
            </p>
            <p><a class="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
          </div>
        </div>
      </div>
    </div>
    
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div> -->

  <div class="mt-4">
    <div class="d-flex justify-content-evenly">
      <div class="col-4">
        <div class="text-start">
          <h5>CustoManager</h5>
        </div>
      </div>
      <div class="col-4">
        <div class="card bg-dark">
          <div class="">
            <h4 class="text-white mt-4">Faça seu Login</h4>

            <div class="row d-flex justify-content-center mt-4">
              <div class="col-10 mb-4">
                <div class="input-group input-group-lg">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="col-10 mb-4">
                <div class="input-group input-group-lg">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Senha"
                  />
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12">
                <button class="col-10 btn btn-lg btn-primary">
                  <span class="fs-6 text-white">Continuar</span>
                </button>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12">
                <button class="btn btn-link" @click="openModalResetPassword()">
                  Esqueci minha senha >
                </button>
              </div>

              <div class="col-12">
                <button class="btn btn-link">Me cadastrar ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="row featurette mt-5">
    <div class="col-7">
      <h2 class="featurette-heading text-center text-break">
        First featurette heading.
        <span class="text-muted">It’ll blow your mind.</span>
      </h2>
      <p class="lead text-center text-break">
        Some great placeholder content for the first featurette here. Imagine
        some exciting prose here.
      </p>
    </div>
    <div class="col-5">
      <svg
        class="
          bd-placeholder-img bd-placeholder-img-lg
          featurette-image
          img-fluid
          mx-auto
        "
        width="500"
        height="500"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 500x500"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#eee" />
        <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
      </svg>
    </div>
  </div>

  <hr class="featurette-divider" />

  <div class="container marketing">
    <div class="row">
      <div class="col-lg-4">
        <svg
          class="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 140x140"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#777" />
          <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
        </svg>

        <h2>Heading</h2>
        <p>
          Some representative placeholder content for the three columns of text
          below the carousel. This is the first column.
        </p>
        <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
      </div>
      <div class="col-lg-4">
        <svg
          class="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 140x140"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#777" />
          <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
        </svg>

        <h2>Heading</h2>
        <p>
          Another exciting bit of representative placeholder content. This time,
          we've moved on to the second column.
        </p>
        <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
      </div>
      <div class="col-lg-4">
        <svg
          class="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 140x140"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#777" />
          <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
        </svg>

        <h2>Heading</h2>
        <p>
          And lastly this, the third column of representative placeholder
          content.
        </p>
        <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
      </div>
    </div>

    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">
          Oh yeah, it’s that good.
          <span class="text-muted">See for yourself.</span>
        </h2>
        <p class="lead">
          Another featurette? Of course. More placeholder content here to give
          you an idea of how this layout would work with some actual real-world
          content in place.
        </p>
      </div>
      <div class="col-md-5 order-md-1">
        <svg
          class="
            bd-placeholder-img bd-placeholder-img-lg
            featurette-image
            img-fluid
            mx-auto
          "
          width="500"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 500x500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#eee" />
          <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
        </svg>
      </div>
    </div>

    <hr class="featurette-divider" />

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">
          And lastly, this one. <span class="text-muted">Checkmate.</span>
        </h2>
        <p class="lead">
          And yes, this is the last block of representative placeholder content.
          Again, not really intended to be actually read, simply here to give
          you a better view of what this would look like with some actual
          content. Your content.
        </p>
      </div>
      <div class="col-md-5">
        <svg
          class="
            bd-placeholder-img bd-placeholder-img-lg
            featurette-image
            img-fluid
            mx-auto
          "
          width="500"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 500x500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#eee" />
          <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
        </svg>
      </div>
    </div>
  </div> -->

  <ModalResetPassword />
</template>

<script>
import Table from "@/components/Table/Table.vue";

import ModalResetPassword from "./Modal/ModalResetPassword.vue";

import { reactive, ref, toRefs } from "@vue/reactivity";
import UserService from "@/services/UserService";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

export default {
  name: "Home",
  components: {
    Table,
    ModalResetPassword,
  },
  setup() {
    const users = ref([]);

    const header = ref([
      {
        name: "Id",
      },
      {
        name: "Nome",
      },
      {
        name: "CPF",
      },
      {
        name: "Email",
      },
      {
        name: "Telefone",
      },
      {
        name: "Endereço",
      },
      {
        name: "Status",
      },
      {
        name: "Ações",
      },
    ]);

    const loading = ref(false);

    const methods = reactive({
      openModalResetPassword() {
        var modal = new bootstrap.Modal(
          document.getElementById("modalResetPassword"),
          {
            keyboard: false,
            backdrop: "static",
          }
        );
        var modalToggle = document.getElementById("modalResetPassword");
        modal.show(modalToggle);
      },

      getAllUser() {
        loading.value = true;
        UserService.getAllUser()
          .then((response) => {
            methods.organizeTable(response.data);
            loading.value = false;
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            loading.value = false;
          });
      },

      organizeTable(response) {
        users.value = [];
        response.map((x) => {
          users.value.push({
            id: x.id,
            nome: x.nome,
            cpf: x.cpf,
            email: x.email,
            telefone: x.telefone,
            endereco: x.endereco,
            status: x.status,
          });
        });
      },

      remove(event) {
        console.log(event);
      },

      edit(event) {
        console.log(event);
      },
    });

    return {
      users,
      header,
      loading,
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
</style>
