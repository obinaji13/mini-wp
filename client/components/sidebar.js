Vue.component('sidebar', {
    template: `
    <div class="col-sm-12 col-md-2 px-0">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" href="#" @click="changePage('my_articles')">My Article</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#" @click="changePage('form_article')">New Article</a>
        </li>
      </ul>
    </div>`,
    methods: {
      changePage(data) {
        this.$emit('change_page', data)
      }
    },
})