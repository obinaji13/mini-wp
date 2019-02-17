// crop-text-3
Vue.component('reader', {
    template: `
      <div class="container-fluid">
        <form class="form-inline mb-3" @submit.prevent="">
          <input class="form-control mr-sm-2" type="search" placeholder="Search by title / tags" v-model="searched">
        </form>

        <div class="card mb-3" v-for="article in filtered">
          <div class="card-header">
            <div class="row no-gutters">
              <div class="col-sm-1">
                <img class="img-thumbnail" :src="article.author.picture || '../css/download.png'" style="max-width: 100%; border-radius: 100%">
              </div>
              <div class="col-sm-11">
                <span>
                  <p>{{article.author.name}}</p>
                </span>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div class="containers-fluid">
              <div class="text-right font-italic">{{new Date(article.createdAt).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })}}</div>
              <div class="row">
                <div class="col-xs-12 col-md-3">
                  <img class="img-thumbnail" :src="article.featuredImage || '../css/blank.jpeg'">
                </div>
                <div class="col-xs-12 col-md-9">
                  <p class="card-text" mb-5><strong><a href="#" @click="getDetail(article._id)" style="text-decoration: none">
                    Title: <span v-html="article.title"></span>
                  </a>
                  </strong></p>
                  <p class="card-text" mb-5><span v-html="article.content"></span></p>
                  <span id="tags" v-for="tag in article.tags" class="mx-1">
                    <a href="#" class="badge badge-secondary" @click="searched = tag">{{tag}}</a>
                  </span>
                </div>
              </div>
            </div>
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
        this.getAllArticles()
    },
    computed: {
      filtered() {
        return this.articles.filter(article => article.title.includes(this.searched) || article.tags.includes(this.searched))
      }
    },
    methods: {
        getAllArticles() {
            axios
                .get(`${url}/articles`, {
                    headers: {token: localStorage.getItem('token')}
                })
                .then(({data}) => {
                    this.articles = data.reverse()
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getDetail(articleId) {
          this.$emit('get_detail', articleId)
        },
    },
})