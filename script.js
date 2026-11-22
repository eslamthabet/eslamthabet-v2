const config = {
  sliderInterval: 4200,
  profile: "assets/profile.png"
};

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const slides=[...document.querySelectorAll(".slide")];
const dots=document.querySelector(".dots");
let current=0;
slides.forEach((_,i)=>{
  const d=document.createElement("button");
  d.className="dot"+(i===0?" active":"");
  d.setAttribute("aria-label",`Slide ${i+1}`);
  d.onclick=()=>showSlide(i);
  dots.appendChild(d);
});
const dotEls=[...document.querySelectorAll(".dot")];
function showSlide(i){
  current=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle("active",n===current));
  dotEls.forEach((d,n)=>d.classList.toggle("active",n===current));
}
document.querySelector(".next").onclick=()=>showSlide(current+1);
document.querySelector(".prev").onclick=()=>showSlide(current-1);
setInterval(()=>showSlide(current+1),config.sliderInterval);

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const f=btn.dataset.filter;
    document.querySelectorAll(".work-card").forEach(card=>{
      card.style.display=(f==="all"||card.dataset.category===f)?"block":"none";
    });
  });
});

document.querySelector(".menu").addEventListener("click",()=>{
  const nav=document.querySelector(".nav nav");
  const open=nav.style.display==="flex";
  nav.style.display=open?"none":"flex";
  if(!open){
    nav.style.position="absolute";
    nav.style.top="70px";
    nav.style.left="20px";
    nav.style.right="20px";
    nav.style.padding="20px";
    nav.style.flexDirection="column";
    nav.style.background="rgba(7,8,13,.96)";
    nav.style.border="1px solid #222";
    nav.style.borderRadius="16px";
  }
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",()=>{
    const nav=document.querySelector(".nav nav");
    if(window.innerWidth<=900) nav.style.display="none";
  });
});
