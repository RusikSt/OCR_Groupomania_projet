<script>
import 'bootstrap-icons/font/bootstrap-icons';
export default {
    name:"postgm",
    props: ['refresh'],
    data: function(){
        return{
        api: import.meta.env.VITE_API,
        userId: JSON.parse(localStorage.getItem('headers')).userId,
        token: JSON.parse(localStorage.getItem('headers')).token,
        message: '',
        image: '',
        post: [],
        error:'',
        success:''
        }
    },
    methods:{
        addPost: function(){
            if(this.message == '') {
                this.error = 'Veuillez écrire un message !'
                this.success = ''
            } else {
                let formData = new FormData()
            
                formData.append('post', this.message)
                formData.append('userId', this.userId)
                formData.append('image', this.image)

                console.log(this.token)

                fetch(`${this.api}/api/post`,{
                    method: 'POST',
                    headers:{
                        'authorization': this.token,
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(data =>{
                    if(data.error){
                        this.error = data.error
                    }else{
                        this.success = 'Message publié avec succès'
                        this.error = ''
                        this.image = ''
                        this.$refs.postImage.value = '';
                        this.message = ''
                        this.refresh()
                    }
                })
            }
        },
        setPicture: function(e){
            this.image = e.target.files[0]
        }
    }

}
</script>
<template>
    <div class="form-floating container-md mt-5">
     <textarea v-model="message" class="form-control" placeholder="Ecrivez quelque chose" id="floatingTextarea2" style="height: 100px"></textarea>
     <label for="floatingTextarea2">Ecrivez quelque chose</label>
        <div>
            <div class=" mb-5 btn">
               <input ref="postImage" type="file" @change="setPicture($event)" class="form-control">
            </div>
            <div v-if="success != ''" class="alert alert-success" role="alert">
                {{success}}
            </div>
            <div v-if="error != ''" class="alert alert-danger" role="alert">
                {{error}}
            </div>
          <button type="button" class="btn btn-danger mt-2 d-flex" @click="addPost">Poster</button>
        </div>
     </div> 
    
      
       
    
     
    
    
</template>
<style>
input{
    display: none;
}
body{
    background-color: rgb(228, 228, 222);
}
.btn-style {
  background-color: #D1515A;
  border-color: #D1515A;
  margin-left: 2px;
  margin-right: 2px;
}
</style>