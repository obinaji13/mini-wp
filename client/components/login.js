Vue.component('login', {
    template: `
    <div class="container">
      <div class="row justify-content-center vh-100 align-middle">
        <div class="col-sm-5 my-5">

            <div class="jumbotron">
              <h1 class="display-4 text-center">Login</h1>
              <hr>
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </form>
              <hr>
              <div class="text-center">
                <a href="#" style="text-decoration: none" @click="changePage">Don't have an account?</a>
                <p class="my-2">or</p>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
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
    login() {
      let user = {
        email: this.email,
        password: this.password
      }
      axios
        .post(`${url}/login`, user)
        .then(({data}) => {
          console.log(data);
          localStorage.setItem('token', data.token)
          this.clearForm()
          this.$emit('logged_in', 'login')
        })
        .catch(err => {
          console.log(err);

        })
    },
    changePage() {
      this.$emit('change_page', 'register')
    },
    clearForm() {
      this.email =  ''
      this.password =  ''
    }
  },
})