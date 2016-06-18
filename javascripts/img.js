// $(document).ready(function() {	
//   var img1 = document.getElementById('img1'),
//   		img2 = document.getElementById('img2'),
//   		canvas = document.getElementById('canvas'),
//   		context = canvas.getContext('2d');

//   $('.js-generator').on('click', function(e) {
//   	e.preventDefault();
//   		var img = canvas.toDataURL("image/jpg");
// 	  canvas.width = img2.width;
// 	  canvas.height = img2.height;

// 	  //context.globalAlpha = 1.0;
// 	  context.drawImage(img2, 0, 0);
// 	  //context.globalAlpha = 0.5; //Remove if pngs have alpha
// 	  context.drawImage(img1, 0, 0);

// 	  function printLocation() {  
// 	  // 	var canvasx = document.getElementById("canvas");
// 	  // 	console.log(canvasx);
// 			// var img = canvasx.toDataURL("image/png");     
// 	  // 	$('#image').attr('src', img);

//       // save canvas image as data url (png format by default)
//       var dataURL = canvas.toDataURL();

//       // set canvasImg image src to dataURL
//       // so it can be saved as an image
//       console.log(document.getElementById('canvas').src = dataURL);
// 	  }

// 	  printLocation();
//   });

// 	function previewFile() {
// 	  var preview = document.getElementById('img1'),
// 	  		file    = document.querySelector('input[type=file]').files[0],
// 	  		reader  = new FileReader();

// 	  reader.onloadend = function () {
// 	    preview.src = reader.result;
// 	  };

// 	  if (file) {
// 	    reader.readAsDataURL(file);
// 	  } else {
// 	    preview.src = "";
// 	  }
// 	}

// 	$("#pic").on('change', function(){
// 	  previewFile(this);
// 	});
// });	

/**
 * Created by ezgoing on 14/9/2014.
 */

//"use strict";

(function(factory) {
  if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
  } else {
      factory(jQuery);
  }
}(function($) {
  var cropbox = function(options, el){
      var el = el || $(options.imageBox),
      		PosX,
      		PosY,
          obj = {
            state : {},
            contrast : 1,
            rotation : 0,
            options : options,
            imageBox : el,
            thumbBox : el.siblings(options.thumbBox),
            spinner : el.find(options.spinner),
            image : new Image(),

            getDataURL: function () {
              var width = this.thumbBox.width(),
                  height = this.thumbBox.height(),
                  canvas = document.createElement("canvas"),
                  dim = el.css('background-position').split(' '),
                  size = el.css('background-size').split(' '),
                  dx = parseInt(dim[0]) - el.width()/2 + width/2,
                  dy = parseInt(dim[1]) - el.height()/2 + height/2,
                  dw = parseInt(size[0]),
                  dh = parseInt(size[1]),
                  sh = parseInt(this.image.height),
                  sw = parseInt(this.image.width);

              canvas.width = width;
              canvas.height = height;
              var context = canvas.getContext("2d");
              context.rotate(this.rotation*Math.PI/180);
              context.scale(1.05, 1.05);
              context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
              var imageData = canvas.toDataURL('image/png');
              return imageData;
            },

            getBlob: function() {
              var imageData = this.getDataURL();
              var b64 = imageData.replace('data:image/png;base64,','');
              var binary = atob(b64);
              var array = [];
              for (var i = 0; i < binary.length; i++) {
                  array.push(binary.charCodeAt(i));
              }
              return  new Blob([new Uint8Array(array)], {type: 'image/png'});
            },

            zoomIn: function() {
              setBackground(1.05);
            },

            zoomOut: function() {
              setBackground(0.95);
            },

            strechIn: function() {
            	setBackground(1.05, true);
            },

            strechOut: function() {
            	setBackground(0.95, true);
            },

            contrastUp: function() {
              this.contrast+=0.1;
              el.css({               
                '-webkit-filter': 'contrast('+ obj.contrast +')',
                'filter': 'contrast('+ obj.contrast +')'
              });
            },

            contrastDown: function() {
              this.contrast-=0.1;
              el.css({               
                '-webkit-filter': 'contrast('+ obj.contrast +')',
                'filter': 'contrast('+ obj.contrast +')'
              });
            },

            rotateRight: function() {
            	this.rotation+=5;
              el.css({
                'transform' : 'rotate('+ obj.rotation +'deg)'
              });
            },

            rotateLeft: function() {
              this.rotation-=5;
              el.css({
                'transform' : 'rotate('+ obj.rotation +'deg)'
              });
            }
        	},

	        setBackground = function(ratio, strech) {
	          var size = el.css('background-size').split(' '),
                sizeW = parseInt(size[0]),
                sizeH = parseInt(size[1]),
                newSizeW = sizeW * ratio,
                newSizeH = sizeH * ratio,
	          		bgposX = parseInt(el.css('background-positionX'), 10),
	          		bgposY = parseInt(el.css('background-positionY'), 10),
								pw = bgposX - ((newSizeW - sizeW) / (1+ratio)),//bgposX * ratio,
	          		ph = bgposY - ((newSizeH - sizeH) / (1+ratio));//bgposY * ratio;

	          if(strech) {
		          el.css({
		            'background-size': newSizeW +'px ' + sizeH + 'px',
		            'background-position': pw + 'px ' + bgposY + 'px'
		          });	
	          } else {
		          el.css({
		            'background-size': newSizeW +'px ' + newSizeH + 'px',
		            'background-position': pw + 'px ' + ph + 'px'
		          });
	          }
	        },

					// setBackgroundImage = function() {
			  //     el.css({
			  //       'background-image': 'url(' + obj.image.src + ')'
			  //     });
					// },

	    //     setBackgroundSize = function() {
	    //       var w = parseInt(obj.image.width)*obj.ratio,
	    //       	 	h = parseInt(obj.image.height)*obj.ratio;

	    //       el.css({
	    //         'background-size': w +'px ' + h + 'px',
	    //       });
	    //     },

	    //     setBackgroundPos = function() {
     //        var size = el.css('background-size').split(' '),
	    //       		imgW = parseInt(size[0]),
	    //       	 	imgH = parseInt(size[1]),
	    //       		initialImgW = parseInt(obj.image.width),
	    //       	 	initialImgH = parseInt(obj.image.height),
	    //       	 	elW = el.width(),
	    //       	 	elH = el.height(),
	    //       	 	centerX = (elW - initialImgW) / 2,
	    //       	 	centerY = (elH - initialImgH) / 2,
	    //       		prevBgposX = parseInt(el.css('background-positionX'), 10),
	    //       		prevBgposY = parseInt(el.css('background-positionY'), 10),
	    //       		bgposX = (centerX - prevBgposX) - ((imgW - elW)/2),
	    //       		bgposY = (centerY - prevBgposY) - ((imgH - elH)/2);
	    //       console.log(centerX, prevBgposX, imgW);

	    //       el.css({
	    //         'background-position': bgposX + 'px ' + bgposY + 'px'
	    //       });
	    //     },

	        imgMouseDown = function(e) {
	          e.stopImmediatePropagation();

	          obj.state.dragable = true;
	          obj.state.mouseX = e.clientX;
	          obj.state.mouseY = e.clientY;
	        },

	        imgMouseMove = function(e) {
	          e.stopImmediatePropagation();

	          if (obj.state.dragable) {
	            var x = e.clientX - obj.state.mouseX;
	            var y = e.clientY - obj.state.mouseY;

	            var bg = el.css('background-position').split(' ');

	            var bgX = x + parseInt(bg[0]);
	            var bgY = y + parseInt(bg[1]);

	            el.css('background-position', bgX +'px ' + bgY + 'px');

	            PosX = bgX;
	            PosY = bgY;

	            obj.state.mouseX = e.clientX;
	            obj.state.mouseY = e.clientY;
	          }
	        },

	        imgMouseUp = function(e) {
	          e.stopImmediatePropagation();
	          obj.state.dragable = false;
	        };

	        // zoomImage = function(e) {
	        //   e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? obj.ratio*=1.1 : obj.ratio*=0.9;
	        //   setBackground();
	        // };

    //obj.spinner.show();
    obj.image.onload = function() {
      //obj.spinner.hide();
      //setBackground();

      var w =  parseInt(obj.image.width),
      		h =  parseInt(obj.image.height),
      		pw = (el.width() - w) / 2,
      		ph = (el.height() - h) / 2;
      		PosX = pw;
	        PosY = ph;

      el.css({
        'background-image': 'url(' + obj.image.src + ')',
        'background-size': w +'px ' + h + 'px',
        'background-position': pw + 'px ' + ph + 'px'
      });

      el.parent('.imageBox').bind('mousedown', imgMouseDown);
      el.parent('.imageBox').bind('mousemove', imgMouseMove);
      $(window).bind('mouseup', imgMouseUp);
    };

    obj.image.src = options.imgSrc;
    el.on('remove', function(){$(window).unbind('mouseup', imgMouseUp)});

    return obj;
  };

	jQuery.fn.cropbox = function(options){
	    return new cropbox(options, this);
	};
}));