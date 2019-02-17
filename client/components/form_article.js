const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

Vue.component('form_article', {
    template: `
      <div class="container-fluid">
        <form @submit.prevent="addArticle">
          <div class="form-group">
            <label for="exampleInputTitle">Title</label>
            <input type="text" class="form-control" id="exampleInputTitle" placeholder="Enter title" v-model="title" required>
          </div>
          <div class="form-group">
              <label for="exampleInputTags">Tags</label>
              <vue-tags-input
                v-model="tag"
                :tags="tags"
                :autocomplete-items="filteredItems"
                @tags-changed="newTags => tags = newTags"
              />
            </div>
          <div class="form-group">
            <label for="exampleFormControlFile1">Image</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="fileChange">
          </div>
          <div class="form-group">
            <label for="exampleInputContent">Content</label>
            <wysiwyg v-model="content" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>`,
    props: ['edit_data'],
    data() {
      return {
        articleId: this.edit_data._id || '',
        title: this.edit_data.title || '',
        image: '',
        content: this.edit_data.content || '',
        tags:  this.edit_data.tags || [],
        tag: '',
        autocompleteItems: [],
      }
    },
    components: {
      wysiwyg: vueWysiwyg.default.component,
      'vue-tags-input': vueTagsInput.default
    },
    created() {
      this.getAllTags()
    },
    computed: {
      filteredItems() {
        return this.autocompleteItems.filter(i => {
          return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        });
      }
    },
    methods: {
      getAllTags() {
        axios
          .get(`${url}/tags`, {
            headers: {token: localStorage.getItem('token')}
          })
          .then(({data}) => {
            this.autocompleteItems = data
          })
          .catch(err => {
            console.log(err);
          })
      },
      addArticle() {
        let newArticle = {
          title: this.title,
          content: this.content,
          tags: this.tags.map(tag => tag.text)
        }
        let formData = new FormData
        formData.append("file", this.image)
        formData.append("data", JSON.stringify(newArticle))
        if (this.articleId) {
          axios
            .put(`${url}/articles/${this.articleId}`, formData, {
              headers: {token: localStorage.getItem('token')}
            })
            .then(({data}) => {
              Toast.fire({
                type: 'success',
                title: 'Successfully edit article'
              })
              this.$emit('change_page', 'my_articles')
              this.clearForm()
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          axios
            .post(`${url}/articles`, formData, {
              headers: {token: localStorage.getItem('token')}
            })
            .then(({data}) => {
              Toast.fire({
                type: 'success',
                title: 'Successfully create new article'
              })
              this.$emit('change_page', 'my_articles')
              this.clearForm()
            })
            .catch(err => {
              console.log(err);
            })
        }
      },
      fileChange(e) {
        this.image = e.target.files[0]
      },
      clearForm() {
        this.articleId = ''
        this.title = ''
        this.tags = []
        this.image = ''
        this.content = ''
      }
    },
})