Vue.component('navbar', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #ffe815;">
      <a class="navbar-brand" href="#" @click="changePage('my_articles')">My site</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#" @click="changePage('reader')">Reader <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <button type="button" class="btn btn-light" @click="signOut">Sign-out</button>
          </li>
        </ul>
      </div>
    </nav>`,
    methods: {
      changePage(data) {
        this.$emit('change_page', data)
      },
      signOut() {
        this.$emit('signout')
      }
    },
})