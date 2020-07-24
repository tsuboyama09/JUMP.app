class ScrollObserver {
  constructor(els, cb, options) {
    this.els = document.querySelectorAll(els);
    const defaultOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
      once: true,
    };
    this.cb = cb;
    this.options = Object.assign(defaultOptions, options);
    this.once = this.options.once;
    this._init();
  }
  _init() {
    const callback = function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //   const ta = new TextAnimation(entry.target);
          //   ta.animate();
          this.cb(entry.target, true);
          if (this.once) {
            //onceがtrueの場合unobserveを実行
            observer.unobserve(entry.target);
            //falseの場合実行しない
          }
        } else {
          this.cb(entry.target, false);
        }
      });
    };
    //IntersectionObserver(window)なのでcallback.bind(this),を指定する  このthisはscrollObserverのthis.cbを参照
    this.io = new IntersectionObserver(callback.bind(this), this.options);

    //スクロールのイベントに対して、100ミリセカンド(0.1秒)ごと監視
    this.io.POLL_INTERVAL = 100;

    //this.elsにすることで、24行目のquerySelectorAll(els)を使用
    this.els.forEach((el) => this.io.observe(el));
  }
  destory() {
    // disconnectでIntersectionObserverの監視が止まる
    this.io.disconnect();
  }
}
