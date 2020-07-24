class HeroSlider {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
  }

  _initSwiper() {
    return new Swiper(this.el, {
      // Optional parameters
      // direction: "vertical",
      loop: true,
      grabCursor: true,
      effect: "coverflow",
      //sliderが中央揃えになる
      centeredSlides: true,
      //一枚だけ表示
      slidesPerView: 1,
      speed: 1000,
      breakpoints: {
        // 画面が1024以上だと２枚になる（両サイド0.５）
        1024: {
          slidesPerView: 2,
        },
      },
      //stast()に写す
      // autoplay: {
      //   //４秒ごとに画像が切り替わる
      //   delay: 4000,
      //   //マウスで画面を動かしても４秒後切り替わる
      //   disableOnInteraction: false,
      // },
    });
  }

  //optionsを使用することで,hero.start({delay: 2000});で速さを変えられる
  start(options = {}) {
    options = Object.assign(
      {
        //４秒ごとに画像が切り替わる
        delay: 4000,
        //マウスで画面を動かしても４秒後切り替わる
        disableOnInteraction: false,
      },
      options
    );

    this.swiper.params.autoplay = options;
    this.swiper.autoplay.start();
  }
  stop() {
    this.swiper.autoplay.stop();
  }
}
