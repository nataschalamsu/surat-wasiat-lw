new Vue ({
  el: '#app',
  data: {
    heading: "Live Code",
    email: "",
    name: "",
    token: "",
    image: "",
    info: null
  },
  methods: {
    getToken: function() {
      console.log(this.email)
      axios
        .post('http://35.198.212.156/request-token', {
          email: this.email,
          name: this.name
        })
        .then(function(response)  {
          console.log("masuk ini res", response);
          this.token = response.uid
        })
        .catch(function(err) {
          console.log("ini err", err)
        })
    },
    getUser: function() {
        axios
          .get('http://35.198.212.156/api/image', {
            headers: {
              authorization: this.token
            }
          })
          .then(response => {
            console.log(response)
            this.info = response
          })
          .catch(err => {
            console.log(err)
          })
    },
    uploadImage: function(event) {
      this.image = event.target.files[0]
      axios
        .post('http://35.198.212.156/api/image', {
          photo: this.image
        })
        .then(response => {
          console.log(response)
          this.info = response
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})