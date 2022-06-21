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
        user: {}
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
      deleteOnePost: function() {
        if(confirm("Souhaitez-vous réellement supprimer ce post ?")){
          fetch(`${this.api}/api/post/${this.postData._id}`, {
            method: 'DELETE',
            headers: {
              'authorization': this.token,
              'Content-Type': 'application/json'
            },
          })
          .then(response => response.json())
          .then(data => {
            if(data.error) {
              console.log(error)
            } else {
              this.refresh()
            }
          })
          .catch(error => console.log(error))
        }
      },
      modifyOnePost: function() {
       if(confirm("Voulez-vous vraiment modifier votre post?")){
        this.saveData();
       }
      },
      saveData(){
        fetch(`${this.api}/api/post/${this.postData._id}`, {
          method: 'PUT',
          headers: {
            'authorization': this.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.postData)
        })
        .then(response => response.json())
        .then(data => {
          if(data.error) {
            console.log(error)
          } else {
            this.postData.edit = false;
            this.refresh()
          }
        })
        .catch(error => console.log(error))
      },
      like(){
       
        this.postData.usersLiked.push(this.userId);
        this.postData.likes++;
        const index = this.postData.usersDisliked.findIndex((d) => d === this.userId);
        if (index !== -1) {
          this.postData.usersDisliked.splice(index, 1);
          this.postData.dislikes--;
        }
        this.saveData();

      },
      dislike(){
        
        this.postData.usersDisliked.push(this.userId);
        this.postData.dislikes++;
        const index = this.postData.usersLiked.findIndex((d) => d === this.userId);
        if (index !== -1) {
          this.postData.usersLiked.splice(index, 1);
          this.postData.likes--;
        }
        this.saveData();
      },
      contains: function(data, id){
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
              <button type="button" class="btn btn-danger  ms-auto" v-if="userId === postData.userId||isAdmin === true" @click="postData.edit = true">Modifier</button>
            </div>
            <div class="d-flex gap-1">
              <button type="button" class="btn btn-danger ms-auto"  v-if="userId === postData.userId||isAdmin === true"  @click="deleteOnePost()">Supprimer</button>
            </div>
          </div>
          <div class="d-flex " >
            <div class=" gap-1">
              <span>Likes: {{postData.likes}}</span>
              <button type="button" class="btn-like ms-2" @click="like()" v-if="!contains(postData.usersLiked, userId)">
                j'aime
              </button>
              <span  v-if="contains(postData.usersLiked, userId)"><i class="bi bi-suit-heart-fill" style="color:#ce6666"></i></span>
            </div>
            <div class=" gap-1 ms-4">
              
              <span>Dislikes: {{postData.dislikes}}</span>
              <button type="button" class="btn-like ms-2 " @click="dislike()" v-if="!contains(postData.usersDisliked, userId)">
               j'aime pas
              </button>
              <span v-if="contains(postData.usersDisliked, userId)"><i class="bi bi-suit-heart-fill" style="color:#2761bf"></i></span>
            </div>
          </div>
            
         
        </div>
      </div>
    </div>
    <div class="card-body container" v-if="postData.edit">
      <textarea v-model="postData.post" class="form-control" placeholder="Ecrivez quelque chose" id="floatingTextarea2" style="height: 100px"></textarea>
        <div class=" mb-5 btn">
          <input ref="postImage" type="file" @change="setPicture($event)" class="form-control">
        </div>
      <button type="button" class="btn btn-danger  ms-auto" @click="modifyOnePost()">Save</button>
      <button type="button" class="btn btn-danger  ms-2 " @click="postData.edit = false">Annuler</button>
    </div>

  </div>
</template>

<style>
  
  .btn-like {
 color: white;
 background-color: #091F43;
 border-color: #091F43;
 margin-left: 2px;
 margin-right: 2px;
 border-radius: 50px;
};
.heart-like{
  color: #ce6666
 
};
.heart-dislike{
  color: #2761bf;
}

</style>