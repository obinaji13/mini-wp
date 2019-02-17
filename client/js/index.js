const url = `http://localhost:3000`

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    axios
        .post(`${url}/googleLogin`, {token: id_token})
        .then(({data}) => {
            localStorage.setItem('token', data.token)
            app.checkLogin()
        })
        .catch(err => {
            console.log(err);

        })
}

let app = new Vue({
    el: '#app',
    data: {
        showPage: '',
        isLogin: false,
        edit_data: {},
        detailArticleId: ''
    },
    created() {
        this.checkLogin()
    },
    methods: {
        checkLogin() {
            if (localStorage.getItem('token')) {
                axios
                    .post(`${url}/verifyToken`, {token: localStorage.getItem('token')})
                    .then(() => {
                        this.showPage = 'my_articles'
                        this.isLogin = true
                    })
                    .catch(err => {
                        console.log(err);
                        console.log('you must login first');
                        this.showPage = 'login'
                        this.isLogin = false
                    })
            } else {
                console.log('you must login first');
                this.showPage = 'login'
                this.isLogin = false
            }
        },
        changePage(page) {
            this.showPage = page
            this.edit_data = {}
        },
        logged_in(page) {
            this.checkLogin()
        },
        editArticle(data) {
            this.showPage = data.page
            this.edit_data = data.article
        },
        signOut() {
            if (gapi.auth2) {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            }
            localStorage.removeItem('token')
            this.checkLogin()
        },
        getDetail(payload) {
            this.detailArticleId = payload
            this.showPage = 'detail'
        }
    },

})