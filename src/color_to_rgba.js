var color_table = require('./color_table.js')

module.exports = function color_to_rgbs(hex, alpha=1.0){

  /*
  Later adjust the
  */

  if (hex in color_table) {

    var inst_rgb = color_table[hex];
    inst_rgb.push(alpha)
    return [inst_rgb[0], inst_rgb[1], inst_rgb[2], alpha];

  } else {

    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');


        var inst_r = (c>>16)&255;
        var inst_g = (c>>8)&255;
        var inst_b = c&255;

        // return '('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        return [inst_r, inst_g, inst_b, alpha];

    }

    // bad hex, return black
    return [0, 0, 0, alpha];

  }

};