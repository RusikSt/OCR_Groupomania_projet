<script>
  import 'bootstrap-icons/font/bootstrap-icons.css'


  export default {
    name: "Cardgm",
    props: ['postData', 'refresh'],
    components: {

    },

    data() {
      return {
        api: import.meta.env.VITE_API,
        userId: JSON.parse(localStorage.getItem('headers')).userId,
        token: JSON.parse(localStorage.getItem('headers')).token,
        isAdmin: JSON.parse(localStorage.getItem('headers')).isAdmin,
        user: {},
        image: '',
        message: this.postData.post
      }
    },
    methods: {
      showOneUser: function () {
        fetch(`${this.api}/api/user/${this.postData.userId}`, {
            method: 'GET',
            headers: {
              'authorization': this.token,
              'Content-Type': 'application/json'
            },
          })
          .then(response => response.json())
          .then(data => {
            this.user = data
          })
          .catch(error => console.log(error))
      },
      deleteOnePost: function () {
        if (confirm("Souhaitez-vous réellement supprimer ce post ?")) {
          fetch(`${this.api}/api/post/${this.postData._id}`, {
              method: 'DELETE',
              headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                console.log(error)
              } else {
                this.refresh()
              }
            })
            .catch(error => console.log(error))
        }
      },
      modifyOnePost: function () {
        if (confirm("Voulez-vous vraiment modifier votre post?")) {

          let formData = new FormData()

          formData.append('post', this.message)
          formData.append('userId', this.userId)
          formData.append('image', this.image)

          console.log(this.image)

          fetch(`${this.api}/api/post/${this.postData._id}`, {
              method: 'PUT',
              headers:{
                  'authorization': this.token,
              },
              body: formData
            })
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                console.log(error)
              } else {
                this.postData.edit = false;
                this.refresh()
              }
            })
            .catch(error => console.log(error))
        }
      },
      setPicture: function(e){
        this.image = e.target.files[0]
      },
      // like() {

      //   this.postData.usersLiked.push(this.userId);
      //   this.postData.likes++;
      //   const index = this.postData.usersDisliked.findIndex((d) => d === this.userId);
      //   if (index !== -1) {
      //     this.postData.usersDisliked.splice(index, 1);
      //     this.postData.dislikes--;
      //   }
      //   this.saveData();

      // },
      // dislike() {

      //   this.postData.usersDisliked.push(this.userId);
      //   this.postData.dislikes++;
      //   const index = this.postData.usersLiked.findIndex((d) => d === this.userId);
      //   if (index !== -1) {
      //     this.postData.usersLiked.splice(index, 1);
      //     this.postData.likes--;
      //   }
      //   this.saveData();
      // },

      like: function(like){
        fetch(`${this.api}/api/post/${this.postData._id}/like`, {
              method: 'POST',
              headers:{
                  'authorization': this.token,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId: this.userId,
                like: like
              })
        })
        .then(response => response.json())
        .then(() => {
          this.refresh()
        })
        .catch(error => console.log(error))
      },

      contains: function (data, id) {
        return (data || []).findIndex((d) => (d === id)) !== -1
      }

    },

    created: function () {
      this.showOneUser()
    },

  }
</script>
<template>
  <div class="card mb-3 m-auto d-flex container">

    <h5 class="mb-2"><strong>{{user.lastname}} {{user.firstname}}</strong></h5>
    <div class="card-body container" v-if="!postData.edit">
      <img v-if="postData.image != ''" :src="postData.image" alt="..." class="w-100" />
      <p class="card-text">{{postData.post}}</p>
      <div>
        <div class="d-flex justify-content-between">
          <div class="mb-2 mt-3 d-flex gap-2">
            <div class="d-flex gap-1">
              <button type="button" class="btn btn-danger  ms-auto" v-if="userId === postData.userId || isAdmin"
                @click="postData.edit = true">Modifier</button>
            </div>
            <div class="d-flex gap-1">
              <button type="button" class="btn btn-danger ms-auto" v-if="userId === postData.userId || isAdmin"
                @click="deleteOnePost()">Supprimer</button>
            </div>
          </div>
          <div class="d-flex ">
            <div class=" gap-1">
              <button type="button" class="btn-like ms-2" @click="like(1)" v-if="!contains(postData.usersLiked, userId) && !contains(postData.usersDisliked, userId)">
                J'aime ({{postData.likes}})
              </button>
              <button type="button" class="btn-like ms-2 like-neutral" @click="like(0)" v-if="contains(postData.usersLiked, userId) ">
                J'aime ({{postData.likes}})
              </button>
              <button type="button" class="btn-like ms-2 like-none" v-if="contains(postData.usersDisliked, userId)">
                J'aime ({{postData.likes}})
              </button>
            </div>
            <div class=" gap-1 ms-4">
              <button type="button" class="btn-like ms-2" @click="like(-1)" v-if="!contains(postData.usersDisliked, userId) && !contains(postData.usersLiked, userId)">
                J'aime pas ({{postData.dislikes}})
              </button>
              <button type="button" class="btn-like ms-2 like-neutral" @click="like(0)" v-if="contains(postData.usersDisliked, userId) ">
                J'aime pas ({{postData.dislikes}})
              </button>
              <button type="button" class="btn-like ms-2 like-none" v-if="contains(postData.usersLiked, userId)">
                J'aime pas({{postData.dislikes}})
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div class="card-body container" v-if="postData.edit">
      <textarea v-model="message" class="form-control" placeholder="Ecrivez quelque chose" id="floatingTextarea2"
        style="height: 100px"></textarea>
      <div class=" mb-5 btn">
        <input ref="postImage" type="file" @change="setPicture($event)" class="form-control">
      </div>
      <button type="button" class="btn btn-danger  ms-auto" @click="modifyOnePost()">Save</button>
      <button type="button" class="btn btn-danger  ms-2 " @click="postData.edit = false">Annuler</button>
    </div>

  </div>
</template>

<style scoped>
  .btn-like {
    color: white;
    background-color: #091F43;
    border-color: #091F43;
    margin-left: 2px;
    margin-right: 2px;
    border-radius: 50px;
  }

  
  .like-neutral{
    background-color: #ce6666
  }

  .like-none{
    background-color: grey
  }
</style>