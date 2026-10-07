// The address is assembled at click time so it never sits in the HTML for
// scrapers. Without JavaScript the page shows it spelled out instead.
(function () {
  "use strict";

  var user = "shanewasahmed";
  var domain = "gmail.com";

  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.hidden = false;
    el.addEventListener("click", function () {
      var subject = el.getAttribute("data-subject") || "";
      window.location.href =
        "mailto:" + user + "@" + domain + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    });
  });

  document.querySelectorAll("[data-email-fallback]").forEach(function (el) {
    el.hidden = true;
  });

  // Mark the section in view in the side index.
  var links = Array.prototype.slice.call(document.querySelectorAll(".rail__index a"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      var link = byId[entry.target.id];
      if (link) link.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
