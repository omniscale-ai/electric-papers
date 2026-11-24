// "Now / Next" and programme highlighting. Times in data are Europe/London;
// on 25 Nov 2026 London is on GMT, so they are UTC.
(function () {
  var ep = window.EP || {};
  var items = ep.programme || [];
  var day = (ep.day || "2026-11-25").split("-").map(Number);
  if (!items.length) return;

  function at(hhmm) {
    var p = hhmm.split(":").map(Number);
    return Date.UTC(day[0], day[1] - 1, day[2], p[0], p[1]);
  }
  function minutes(ms) { return Math.round(ms / 60000); }
  function span(ms) { var m = minutes(ms), h = Math.floor(m / 60); return h ? h + " h " + (m % 60) + " min" : m + " min"; }
  function set(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; }

  var rows = document.querySelectorAll(".programme .row");

  // Preview: ?now=HH:MM shows the page as at that time on the workshop day.
  var preview = (location.search.match(/[?&]now=(\d{1,2}:\d{2})/) || [])[1];

  function tick() {
    var now = preview ? at(preview) : Date.now();
    var first = at(items[0].start), last = at(items[items.length - 1].end);
    var cur = -1, next = -1;
    items.forEach(function (it, i) {
      if (now >= at(it.start) && now < at(it.end)) cur = i;
      if (next < 0 && at(it.start) > now) next = i;
    });

    rows.forEach(function (row, i) {
      row.classList.toggle("is-now", i === cur);
      row.classList.toggle("is-done", now >= at(items[i].end));
    });

    if (now < first) {
      var d = first - now, days = Math.floor(d / 86400000);
      set("now-title", "The workshop starts at 09:30 GMT on 25 November");
      set("now-time", days >= 1 ? "in " + days + " day" + (days > 1 ? "s" : "") : "in " + span(d));
    } else if (now >= last) {
      set("now-title", "The workshop has finished. Thank you!");
      set("now-time", "Results will appear in the Outputs section.");
    } else if (cur >= 0) {
      set("now-title", items[cur].title);
      set("now-time", items[cur].start + "–" + items[cur].end + " · " + minutes(at(items[cur].end) - now) + " min left");
    }

    if (next >= 0) {
      set("next-title", items[next].title);
      set("next-time", items[next].start + (now >= first ? " · in " + minutes(at(items[next].start) - now) + " min" : ""));
    } else {
      set("next-title", "—");
      set("next-time", "");
    }
  }

  tick();
  setInterval(tick, 30000);
})();

// copy buttons ("Bring your AI agent")
document.querySelectorAll("button.copy").forEach(function (b) {
  b.addEventListener("click", function () {
    var t = document.getElementById(b.dataset.copy).textContent;
    var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1500); };
    if (navigator.clipboard) { navigator.clipboard.writeText(t).then(done, function () {}); }
  });
});
