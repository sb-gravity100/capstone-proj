function toggleMenu() {
   var menu = document.querySelector('.toggle');
   var banner = document.querySelector('.banner');
   var announcements = document.querySelector('.announcements');
   menu.classList.toggle('active');
   banner?.classList.toggle('active');
   announcements?.classList.toggle('active');
}
function listAnnounce(e) {
   var announce = document.querySelector('.announce');
   var res = [];
   e.forEach((e) => {
      var a = document.createElement('li');
      a.classList.add('item');
      a.innerHTML = `<h2>${e.title}</h2><p>${e.body}</p><div class="reactions"><span>&#128077; ${e.reactions}</span></div>`;
      res.push(a);
   });
   announce.classList.toggle('active');
   announce.append(...res);
}
if (location.href.includes('/announcements')) {
   fetch('sample.json').then((e) =>
      e.json().then((x) => listAnnounce(x.posts))
   );
}
