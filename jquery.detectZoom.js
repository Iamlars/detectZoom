// 检测页面是否缩放
;(function(window,$,undefined){

  function DetectZoom(){
    this.body = $('body');
    this.screen = window.screen;
    this.outerWidth = window.outerWidth;
    this.deviceXDPI = screen.deviceXDPI;
    this.ua = navigator.userAgent.toLowerCase();
    this.isIE = ~this.ua.indexOf('msie') && this.deviceXDPI;

    this.mousewheel();
    this.keydown();
    this.setRatio();

  }

  DetectZoom.prototype.getRatio = function () {
    if(window.devicePixelRatio){
       return window.devicePixelRatio;
    }
    if (this.isIE && this.screen.logicalXDPI) {
      return this.deviceXDPI / this.screen.logicalXDPI;
    }
    if (this.outerWidth && window.innerWidth) {
      return this.outerWidth / window.innerWidth;
    }
    return false;
  };

  DetectZoom.prototype.setRatio = function () {
    var that = this;
    setTimeout(function(){
      that.body.attr('zoom',that.getRatio() === 1 ? '' : 'scale');
    },0);
  };

  DetectZoom.prototype.mousewheel = function () {
    var that = this;
    $(document).on('mousewheel DOMMouseScroll',function(e){
      if(e.ctrlKey){
        that.setRatio();
      }
    })
  };

  DetectZoom.prototype.keydown = function () {
    var that = this;
    $(document).on('keydown',function(e){
      if(e.ctrlKey){
        switch (e.which) {
          case 48:/*0*/
          case 96:/*0*/
          case 187:/*+*/
          case 189:/*-*/
          that.setRatio();break;
        }
      }
    })
  };

  new DetectZoom();

}(window,window.jQuery))
