'use strict';

var React = require('react');
var Canvas = require('./Canvas.js');
var qr = require('qr.js');
var {
    Text,
    WebView,
    View
} = require('react-native');

function getBackingStorePixelRatio(ctx) {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  );
}

function renderCanvas(canvas) {
    var fgColor = this.fgColor;
    var bgColor = this.bgColor;
    var ctx = canvas.getContext('2d');
    var cells = this.cells;
    var tileW = this.size / cells.length;
    var tileH = this.size / cells.length;
    var scale = 1;
    canvas.height = canvas.width = this.size * scale;
    ctx.scale(scale, scale);

    cells.forEach(function(row, rdx) {
      row.forEach(function(cell, cdx) {
        ctx.fillStyle = cell ? fgColor : bgColor;
        var w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW));
        var h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH));
        ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
      });
    });

    if (this.logo) {
      var size = this.size;
      var image = document.createElement('img');
      image.src = this.logo;
      image.onload = function() {
        var dwidth = size * 0.2;
        var dx = (size - dwidth) / 2;
        var dheight = image.height / image.width * dwidth;
        var dy = (size - dheight) / 2;
        image.width = dwidth;
        image.height = dheight;
        ctx.drawImage(image, dx, dy, dwidth, dheight);
      }
    }
}

var QRCode = React.createClass({
    PropTypes: {
        value: React.PropTypes.string,
        size: React.PropTypes.number,
        bgColor: React.PropTypes.string,
        fgColor: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            value: 'https://github.com/cssivision',
            fgColor: 'white',
            bgColor: 'black',
            size: 128,
        }
    },

    utf16to8: function(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    },

    render: function() {
        var size = this.props.size;
        var value = this.utf16to8(this.props.value);
        return (
            <View>
                <Canvas
                    context={{
                        size: size,
                        value: this.props.value,
                        bgColor: this.props.bgColor,
                        fgColor: this.props.fgColor,
                        cells: qr(value).modules,
                        logo: this.props.logo
                    }}
                    render={renderCanvas}
                    style={{height: size, width: size}}
                />
            </View>
        );
    }
});


module.exports = QRCode;
