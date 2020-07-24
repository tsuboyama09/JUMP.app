class MobileMenu {
  constructor() {
    this.DOM = {};
    this.DOM.btn = document.querySelector(".mobile-menu__btn");
    this.DOM.cover = document.querySelector(".mobile-menu__cover");  //アイコン以外を押してもメニューが閉じる
    this.DOM.container = document.querySelector("#global-container");
    this.eventType = this._getEventType();
    this._addEvent();
  }

  //イベントを切り分けることによって見る部分を限定してあげる
  _getEventType() {
    //ontouchstart はスマホで閲覧した場合 touchstart PCで閲覧した場合 click が this.eventTypeに格納され、_addEventに渡される
    //ontouchstart 画面をタッチすると反応する
    return window.ontouchstart ? "touchstart" : "click";
  }

  _toggle() {
    this.DOM.container.classList.toggle("menu-open");
  }

  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    //アイコン以外を押してもメニューが閉じる
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }

}
