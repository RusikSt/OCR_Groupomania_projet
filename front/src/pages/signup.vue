<script>
export default {
    name: "signup",
    data: function(){
      return {
        api: import.meta.env.VITE_API,
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        error: '',
        success: ''
      }
    },
    methods: {
      isSignup: function(){
        if(
          this.lastname != '' &&
          this.firstname != '' &&
          this.email != '' &&
          this.password != ''
        ) {
          fetch(`${this.api}/api/auth/signup`, {
            method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
            body: JSON.stringify({
              lastname: this.lastname,
              firstname: this.firstname,
              email: this.email,
              password: this.password
            })
          })
          .then(response => response.json())
          .then(data => {
            if(data.message) {
              this.error = ''
              this.success = data.message
            } else {
              this.error = data.error.message
              this.success = ''
            }

          })
          .catch(error => {
            this.error = error
            this.success = ''
            console.log(error)
          })
        } else {
          alert('Veullez compléter tous les champs !')
        }
      }
    }
      
  }

    

  

</script>
<template>
    <div class="container mt-2">
      <div class="d-flex flex-wrap align-items-center justify-content-end">
        <a href="/signup">
          <button type="button" class="btn-style btn-lg">Signup</button>
        </a>
        <a href="/login">
          <button type="button" class="btn-style btn-lg">Login</button>
        </a>  
      </div>
    </div> 

<main class="form-signin">
  <form @submit.prevent="false">
    <img class="mb-4 d-block mx-auto logo-style" src="../../public/icon-above-font.png" alt="Logo de Groupomania">
    <h1 class="h3 mb-3 fw-normal">Inscrivez-vous</h1>
    <div>
    
      <div class="form-floating">
        <input type="text" class="form-control" v-model="lastname" placeholder="Dupont">
        <label for="floatingInput">Nom</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" v-model="firstname" placeholder="David">
        <label for="floatingInput">Prénom</label>
      </div>
      <div class="form-floating">
        <input type="email" class="form-control" v-model="email" placeholder="name@example.com">
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" v-model="password" placeholder="******">
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div v-if="success != ''" class="alert alert-success" role="alert">
        {{success}}
      </div>
      <div v-if="error != ''" class="alert alert-danger" role="alert">
        {{error}}
      </div>
    </div>

    
    <button class="w-100 btn-style  btn-lg   mb-4 d-block" @click="isSignup()" type="submit">S'inscrire</button>
    
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
  </form>
</main>
</template>
<style scoped>
.logo-style{
   width: 230px
}

body {
  height: 100%;
}

.btn-style {
  background-color: #D1515A;
  border-color: #D1515A;
  margin-left: 2px;
  margin-right: 2px;
  
  
}
  .btn-style {
    background-color: #D1515A;
    border-color: #D1515A;
    margin-left: 2px;
    margin-right: 2px;


  }

  .headeur-style {
    background-color: #091F43;
  }

  body {

    align-items: center;

    padding-bottom: 40px;
    background-color: E7D3C1;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }

  }

  .b-example-divider {
    height: 3rem;
    background-color: rgba(180, 54, 54, 0.803);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }

  .form-control-dark {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: var(--bs-gray);
  }

  .form-control-dark:focus {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: #fff;
    box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
  }

  .bi {
    vertical-align: -.125em;
    fill: currentColor;
  }

  .text-small {
    font-size: 85%;
  }

  .dropdown-toggle {
    outline: 0;
  }

  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }

  .form-control-dark {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: var(--bs-gray);
  }

  .form-control-dark:focus {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: #fff;
    box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
  }

  .bi {
    vertical-align: -.125em;
    fill: currentColor;
  }

  .text-small {
    font-size: 85%;
  }

  .dropdown-toggle {
    outline: 0;
  }
.headeur-style{
  background-color: #091F43;
}

body {
  
  align-items: center;
  
  padding-bottom: 40px;
  background-color: #ece6e1;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }

      }
 .b-example-divider {
  height: 3rem;
  background-color: rgba(180, 54, 54, 0.803);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}     
</style>