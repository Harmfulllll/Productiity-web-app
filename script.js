/* document.getElementById("feature").addEventListener("click", function () {
  document.getElementById("featurepage").scrollIntoView({ behavior: "smooth" });
}); */
/* document.getElementById("contact").addEventListener("click", function () {
  document.getElementById("foot").scrollIntoView({ behavior: "smooth" });
}); */

function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

init();

/* var send = document.getElementById("send");
var em = document.getElementById("email");
var mess = document.getElementById("message");
var id = document.getElementById("form");
 */
function send1() {
  (function () {
    emailjs.init("LWk0v6cXYSDoj-kzJ");
  })();

  var params = {
    from_name: document.querySelector("#email").value,
    message: document.querySelector("#message").value,
  };
  /*   console.log(em.value);
  console.log(mess.value); */
  /*  console.log(params); */

  emailjs.send("service_4mtsus6", "template_y562x9j", params).then(
    function (response) {
      alert("Thanks for your message");
    },
    function (error) {
      console.log("FAILED...");
    }
  );
}
var crsr = document.querySelector(".cursor");
var main = document.querySelector(".main");
document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + 20 + "px";
  crsr.style.top = dets.y + 20 + "px";
});

gsap.from(".page1 h1,.page1 h2", {
  y: 10,
  rotate: 10,
  opacity: 0,
  delay: 0.3,
  duration: 0.7,
});
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top 27%",
    end: "top 0",
    scrub: 3,
  },
});
tl.to(
  ".page1 h1",
  {
    x: -100,
  },
  "anim"
);
tl.to(
  ".page1 h2",
  {
    x: 100,
  },
  "anim"
);
tl.to(
  ".page1 video",
  {
    width: "90%",
  },
  "anim"
);

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top -115%",
    end: "top -120%",
    scrub: 3,
  },
});
tl2.to(".main", {
  backgroundColor: "#fff",
});

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top -280%",
    end: "top -300%",
    scrub: 3,
  },
});

tl3.to(".main", {
  backgroundColor: "#0F0D0D",
});

var tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page44 h1",
    scroller: ".main",
    // markers:true,
    start: "top 20%",
    end: "top 0",
    scrub: 3,
  },
});
tl4.to(
  ".page44 h1",
  {
    x: -100,
  },
  "hello"
);
tl4.to(
  ".page44 p",
  {
    x: 100,
  },
  "hello"
);

var tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page45 h1",
    scroller: ".main",
    // markers:true,
    start: "top 20%",
    end: "top 0",
    scrub: 3,
  },
});
tl5.to(
  ".page45 h1",
  {
    x: 100,
  },
  "hello"
);
tl5.to(
  ".page45 p",
  {
    x: -100,
  },
  "hello"
);

var tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page46 h1",
    scroller: ".main",
    // markers:true,
    start: "top 20%",
    end: "top 0",
    scrub: 3,
  },
});
tl6.to(
  ".page46 h1",
  {
    x: -100,
  },
  "hello"
);
tl6.to(
  ".page46 p",
  {
    x: 100,
  },
  "hello"
);

var tl7 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page47 h1",
    scroller: ".main",
    // markers:true,
    start: "top 20%",
    end: "top 0",
    scrub: 3,
  },
});
tl7.to(
  ".page47 h1",
  {
    x: 100,
  },
  "hello"
);
tl7.to(
  ".page47 p",
  {
    x: -100,
  },
  "hello"
);
/* 
var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");
h4.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    purple.style.display = "block";
    purple.style.opacity = "1";
  });
  elem.addEventListener("mouseleave", function () {
    purple.style.display = "none";
    purple.style.opacity = "0";
  });
});
 */
