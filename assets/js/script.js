(() => {
  const c = window.WEDDING_CONFIG;
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];

  window.addEventListener("load", () => setTimeout(() => $("#loader").classList.add("hide"), 450));

  // Personalize text and images
  $$("[data-bride]").forEach(el => el.textContent = c.bride);
  $$("[data-groom]").forEach(el => el.textContent = c.groom);
  $$("[data-date-label]").forEach(el => el.textContent = c.dateLabel);
  $$("[data-venue]").forEach(el => el.textContent = c.venue);
  $$("[data-address]").forEach(el => el.textContent = c.address);
  $$("[data-bride-photo]").forEach(el => el.src = c.bridePhoto);
  $$("[data-groom-photo]").forEach(el => el.src = c.groomPhoto);
  $$("[data-map]").forEach(el => el.href = c.mapUrl);
  $$("[data-year]").forEach(el => el.textContent = new Date(c.date).getFullYear());

  // Opening ribbon animation
  $("#openInvitation").addEventListener("click", () => {
    $("#coverCard").classList.add("open");
    setTimeout(() => {
      $("#opening").classList.add("opened");
      $("#invitation").classList.add("visible");
      $("#invitation").setAttribute("aria-hidden","false");
      setTimeout(() => document.body.style.overflow = "auto", 500);
      window.scrollTo({top:0, behavior:"smooth"});
    }, 850);
  });
  document.body.style.overflow = "hidden";

  // Countdown
  const target = new Date(c.date).getTime();
  function tick(){
    let diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff/86400000); diff%=86400000;
    const h = Math.floor(diff/3600000); diff%=3600000;
    const m = Math.floor(diff/60000); diff%=60000;
    const s = Math.floor(diff/1000);
    $("#days").textContent = String(d).padStart(2,"0");
    $("#hours").textContent = String(h).padStart(2,"0");
    $("#minutes").textContent = String(m).padStart(2,"0");
    $("#seconds").textContent = String(s).padStart(2,"0");
  }
  tick(); setInterval(tick,1000);

  // Scroll reveal
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target); }
  }), {threshold:.12});
  $$(".reveal").forEach(el => io.observe(el));

  // Gallery lightbox
  const lightbox=$("#lightbox"), lightImg=$("#lightboxImg");
  $$(".gallery-item").forEach(btn => btn.addEventListener("click", () => {
    lightImg.src=btn.dataset.image; lightbox.classList.add("show"); lightbox.setAttribute("aria-hidden","false");
  }));
  const close=()=>{lightbox.classList.remove("show");lightbox.setAttribute("aria-hidden","true")};
  $("#closeLightbox").addEventListener("click",close);
  lightbox.addEventListener("click",e=>{if(e.target===lightbox)close()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});

  // RSVP: mailto fallback; replace with Formspree/Google Apps Script endpoint if desired.
  $("#rsvpForm").addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(`Wedding RSVP - ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nAttendance: ${data.get("attendance")}\nGuests: ${data.get("guests")}\nMessage: ${data.get("message")||"-"}`
    );
    const email = c.rsvpEmail || "";
    if(email){
      location.href=`mailto:${email}?subject=${subject}&body=${body}`;
      $("#rsvpMessage").textContent="Thank you! Your RSVP email is ready.";
    }else{
      $("#rsvpMessage").textContent="Thank you! RSVP received on this device. Connect an email/form endpoint in config.js for real online submissions.";
      e.target.reset();
    }
  });

  // Music
  const audio=$("#weddingMusic"), musicBtn=$("#musicToggle");
  if(c.musicUrl) audio.src=c.musicUrl;
  musicBtn.addEventListener("click", async()=>{
    if(!c.musicUrl){ $("#rsvpMessage").textContent="Add a music file URL to musicUrl in config.js."; return; }
    if(audio.paused){ await audio.play(); musicBtn.classList.add("active"); }
    else {audio.pause();musicBtn.classList.remove("active");}
  });
})();