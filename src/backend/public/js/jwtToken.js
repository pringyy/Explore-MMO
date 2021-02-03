function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

setInterval(function () {
  $.ajax({
    type: "POST",
    url: "/token",
    data: {
      refreshToken: getCookie("refreshJwt"),
    },
    success: function (data) {},
    error: function (xhr) {
      window.location.replace("/");
    },

  });
}, 10000);
