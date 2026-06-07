// Redirect to /admin after Netlify Identity handles invite/recovery tokens
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', function (user) {
    if (!user) {
      window.netlifyIdentity.on('login', function () {
        document.location.href = '/admin/'
      })
    }
  })
}
