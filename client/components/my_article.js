Vue.component('my_article', {
    template: `
      <div class="container-fluid">
        <form class="form-inline mb-3" @submit.prevent="">
          <input class="form-control mr-sm-2" type="search" placeholder="Search by title / tags" v-model="searched">
        </form>

        <div class="card mb-3" v-for="article in filtered">
          <a href="#" @click="getDetail(article._id)" style="text-decoration: none">
            <h5 class="card-header"><strong>{{article.title}}</strong></h5>
          </a>
          <div class="card-body">
            <div class="containers-fluid">
              <div class="text-right font-italic">{{new Date(article.createdAt).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })}}</div>
              <div class="row">
                <div class="col-xs-12 col-md-3">
                  <img style="" class="img-thumbnail" :src="article.featuredImage || '../css/blank.jpeg'">
                </div>
                <div class="col-xs-12 col-md-9">
                  <p class="card-text"><span v-html="article.content"></span></p>
                  <span id="tags" v-for="tag in article.tags" class="mx-1">
                    <a href="#" class="badge badge-secondary" @click="searched = tag">{{tag}}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-right" style="background-color: white">
            <a href="#" class="btn btn-sm btn-primary mx-2" @click="changePage('form_article', article)">Edit</a>
            <a href="#" class="btn btn-sm btn-danger mx-2" @click="deleteArticle(article._id)">Delete</a>
          </div>
        </div>

      </div>`,
    data() {
        return {
            articles: [],
            searched: ''
        }
    },
    created() {
        this.getMyArticles()
    },
    computed: {
      filtered() {
        return this.articles.filter(article => article.title.includes(this.searched) || article.tags.includes(this.searched))
      }
    },
    methods: {
        getMyArticles() {
            axios
                .get(`${url}/articles/myarticles`, {
                    headers: {token: localStorage.getItem('token')}
                })
                .then(({data}) => {
                    this.articles = data.reverse()
                })
                .catch(err => {
                    console.log(err);
                })
        },
        changePage(page, article) {
          let tags = []
          article.tags.forEach(tag => {
            tags.push({text: tag})
          });
          article.tags = tags
          let data = {
            page: page,
            article: article
          }
          this.$emit('edit_article', data)
        },
        deleteArticle(articleId) {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((result) => {
            if (result.value) {
              axios
                .delete(`${url}/articles/${articleId}`, {
                  headers: {token: localStorage.getItem('token')}
                })
                .then(({data}) => {
                  let index = this.articles.map(article => article._id).indexOf(data._id)
                  this.articles.splice(index, 1)
                  Swal.fire(
                    'Deleted!',
                    'Your article has been deleted.',
                    'success'
                  )
                  // this.getMyArticles()
                })
                .catch(err => {
                  console.log(err);
                })
            }
          })
        },
        getDetail(articleId) {
          this.$emit('get_detail', articleId)
        }
    },
})