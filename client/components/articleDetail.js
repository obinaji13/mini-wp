Vue.component('article_detail', {
    template: `
      <div class="container-fluid">
        <div class="card mb-3">
          <div class="card-header">
            <div class="row no-gutters">
              <div class="col-sm-1">
                <img v-if="article.author" class="img-thumbnail" :src="article.author.picture || '../css/download.png'" style="max-width: 100%; border-radius: 100%">
              </div>
              <div class="col-sm-11">
                <span>
                  <p v-if="article.author">{{article.author.name}}</p>
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
                  <p class="card-text" mb-5><strong>Title: <span v-html="article.title"></span></strong></p>
                  <p class="card-text" mb-5><span v-html="article.content"></span></p>
                  <span id="tags" v-for="tag in article.tags" class="mx-1">
                    <a href="#" class="badge badge-secondary" @click="searched = tag">{{tag}}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-5">

        <h3 v-if="comments.length > 0">Comments</h3>
        <div class="card mb-3" v-for="comment in comments">
          <div class="card-header">
            <div class="row no-gutters">
              <div class="col-sm-1">
                <img v-if="comment.userId" class="img-thumbnail" :src="comment.userId.picture || '../css/download.png'" style="max-width: 100%; border-radius: 100%">
              </div>
              <div class="col-sm-11">
                <span>
                  <p v-if="comment.userId">{{comment.userId.name}}</p>
                </span>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div class="containers-fluid">
              <div class="text-right font-italic">{{new Date(comment.createdAt).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })}}</div>
              <div class="row">
                <div class="col-xs-12 col">
                  <p class="card-text" mb-5><span v-html="comment.comment"></span></p>
                  <span id="tags" v-for="tag in comment.tags" class="mx-1">
                    <a href="#" class="badge badge-secondary" @click="searched = tag">{{tag}}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <h4>Add comment</h4>
        <form @submit.prevent="createComment">
          <div class="form-group">
            <wysiwyg v-model="newComment" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>`,
    props: ['article_id'],
    data() {
        return {
            article: {},
            comments: [],
            newComment: ''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    created() {
        console.log(this.article_id);

        this.getArticle()
        this.getAllComments()
    },
    methods: {
        getArticle() {
            axios
                .get(`${url}/articles/${this.article_id}`, {
                    headers: {token: localStorage.getItem('token')}
                })
                .then(({data}) => {
                    this.article = data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getAllComments() {
            axios
                .get(`${url}/comments/${this.article_id}`, {
                    headers: {token: localStorage.getItem('token')}
                })
                .then(({data}) => {
                    this.comments = data.reverse()
                })
                .catch(err => {
                    console.log(err);
                })
        },
        createComment() {
            console.log(this.newComment);

            if (this.newComment) {
                axios
                    .post(`${url}/comments/${this.article_id}`, {comment: this.newComment}, {
                        headers: {token: localStorage.getItem('token')}
                    })
                    .then(({data}) => {
                        console.log(data);
                        this.comments.push(data)
                    })
                    .catch(err => {
                        console.log(err);

                    })
            } else {
                console.log('input comment first');

            }
        }
    },
})