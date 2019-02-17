Vue.component('register', {
    template: `
    <div class="container">
      <div class="row justify-content-center vh-100 align-middle">
        <div class="col-sm-5 my-5">

            <div class="jumbotron">
              <h1 class="display-4 text-center">Register</h1>
              <hr>
              <form @submit.prevent="register">
                <div class="form-group">
                  <label for="exampleInputName">Full name</label>
                  <input type="text" class="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter Full name" v-model="name">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">Profile Picture</label>
                  <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="fileChange">
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </form>
              <hr>
              <div class="text-center">
                <a href="#" style="text-decoration: none" @click="changePage">Already have an account?</a>
              </div>
            </div>

        </div>
      </div>
    </div>`,
    data() {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
  methods: {
    register() {
      let user = {
        name: this.name,
        email: this.email,
        password: this.password,
        picture: ''
      }
      let formData = new FormData
      formData.append('file', this.picture)
      formData.append('data', JSON.stringify(user))
      axios
        .post(`${url}/register`, formData)
        .then(({data}) => {
          console.log(data);
          this.clearForm()
          this.changePage()
        })
        .catch(err => {
          console.log(err);

        })
    },
    changePage() {
      this.$emit('change_page', 'login')
    },
    clearForm() {
      this.name =  ''
      this.email =  ''
      this.password =  ''
      this.picture = ''
    },
    fileChange(e) {
      this.picture = e.target.files[0]
    },
  },
})