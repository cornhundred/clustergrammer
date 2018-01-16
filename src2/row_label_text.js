const vectorizeText = require('vectorize-text');

module.exports = function row_label_text(){

  console.log('working on row label text')

  // max ~200 min ~20
  var font_detail = 200;
  outside_text_vect = []

  // make some text
  tmp_text_vect = vectorizeText('Outside text', {
    textAlign: 'right',
    textBaseline: 'middle',
    triangles:true,
    size:font_detail,
    font:'"Open Sans", verdana, arial, sans-serif'
  });

  tmp_text_vect.offset = [0, 0.5];
  outside_text_vect[0] = tmp_text_vect

  // make some text
  tmp_text_vect = vectorizeText('short', {
    textAlign: 'right',
    textBaseline: 'middle',
    triangles:true,
    size:font_detail,
    font:'"Open Sans", verdana, arial, sans-serif'
  });
  tmp_text_vect.offset = [0.0, -0.2];
  outside_text_vect[1] = tmp_text_vect

  return outside_text_vect;
};