document.addEventListener('DOMContentLoaded', function () {
  // const hero = new HeroSlider(".swiper-container");
  // hero.start();

  // const cb = function (el, inview) {
  //   if (inview) {
  //     const ta = new TweenTextAnimation(el);
  //     ta.animate();
  //   }
  // };

  // const so = new ScrollObserver(".tween-animate-title", cb);


  // const _inviewAnimation = function (el, inview) {
  //   if (inview) {
  //     el.classList.add('inview');
  //   } else {
  //     el.classList.remove("inview");
  //   }
  // }

  // const so2 = new ScrollObserver(".cover-slide", _inviewAnimation);


  //class Mainに記述
  //headerの背景色
  // const header = document.querySelector('.header');  //headerクラスに適用
  // const _navAnimation = function (el, inview) {
  //   if (inview) {
  //     header.classList.remove("triggered");  //画面内で削除
  //   } else {
  //     header.classList.add("triggered");     //画面外で付与
  //   }
  // }

  // const so3 = new ScrollObserver(".nav-trigger", _navAnimation, { once: false });
  
  // Xメニューの動作読み込み
  // new MobileMenu();

  const main = new Main();


  //５秒後にスライドが止まる（二枚は動かない）
  // setTimeout(() => {
  //   hero.stop();
  // }, 5000)
});


class Main {
  constructor() {
    this.header = document.querySelector(".header");
    //要素が２つあるのでAll（左右サイド）
    this.sides = document.querySelectorAll(".side");
    this._observers = [];
    this._init();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider(".swiper-container");
    //回線が遅いとロード中にアニメーションが終わってしまうので、ロードが終わったらアニメーションが動くように設定
    Pace.on('done', this._paceDone.bind(this));
    // this._scrollInit();
  }

  _paceDone() {
    this._scrollInit();
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove("inview");
    }
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }

  _sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach(side => side.classList.add("inview"));
    } else {
      this.sides.forEach(side => side.classList.remove("inview"));
    }
  }

  _textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  };

  //画面外ではアニメーションが止まるようにする
  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }


  _scrollInit() {
    this.observers = new ScrollObserver(".nav-trigger", this._navAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver(".cover-slide", this._inviewAnimation);
    this.observers = new ScrollObserver(".appear", this._inviewAnimation);
    this.observers = new ScrollObserver(".tween-animate-title",this._textAnimation);
    this.observers = new ScrollObserver(".swiper-container", this._toggleSlideAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver("#main-content", this._sideAnimation.bind(this), { once: false, rootMargin: "-300px 0px" });  //rootMargin 上下300pxのところでアニメーション発火
  }

}


//hero-slider.jsに移行

// class HeroSlider {
//   constructor(el) {
//     this.el = el;
//     this.swiper = this._initSwiper();
//   }

//   _initSwiper() {
//     return new Swiper(this.el, {
//       // Optional parameters
//       // direction: "vertical",
//       loop: true,
//       grabCursor: true,
//       effect: "coverflow",
//       //sliderが中央揃えになる
//       centeredSlides: true,
//       //一枚だけ表示
//       slidesPerView: 1,
//       speed: 1000,
//       breakpoints: {
//         // 画面が1024以上だと２枚になる（両サイド0.５）
//         1024: {
//           slidesPerView: 2,
//         },
//       },
//       //stast()に写す
//       // autoplay: {
//       //   //４秒ごとに画像が切り替わる
//       //   delay: 4000,
//       //   //マウスで画面を動かしても４秒後切り替わる
//       //   disableOnInteraction: false,
//       // },
//     });
//   }

//   //optionsを使用することで,hero.start({delay: 2000});で速さを変えられる
//   start(options = {}) {
//     options = Object.assign(
//       {
//         //４秒ごとに画像が切り替わる
//         delay: 4000,
//         //マウスで画面を動かしても４秒後切り替わる
//         disableOnInteraction: false,
//       },
//       options
//     );

//     this.swiper.params.autoplay = options;
//     this.swiper.autoplay.start();
//   }
//   stop() {
//     this.swiper.autoplay.stop();
//   }
// }





// const mySwiper = new Swiper(".swiper-container", {
//   // Optional parameters

//   //コメントアウトすると横にスライド
//   // direction: "vertical",
//   loop: true,

//   //スライドではないアニメーション
//   effect: 'coverflow',

//   // // If we need pagination
//   // pagination: {
//   //   el: ".swiper-pagination",
//   // },

//   // // Navigation arrows
//   // navigation: {
//   //   nextEl: ".swiper-button-next",
//   //   prevEl: ".swiper-button-prev",
//   // },

//   // // And if we need scrollbar
//   // scrollbar: {
//   //   el: ".swiper-scrollbar",
//   // },
// })
