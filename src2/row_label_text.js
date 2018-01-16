const vectorizeText = require('vectorize-text');

module.exports = function row_label_text(){

  console.log('working on row label text')

  // max ~200 min ~20
  var font_detail = 200;

  vect_text_attrs = {
    textAlign: 'right',
    textBaseline: 'middle',
    triangles:true,
    size:font_detail,
    font:'"Open Sans", verdana, arial, sans-serif'
  }

  offsets = _.range(3);


  // _.each(labels, function(d, i){
  //   console.log(d, i)

  //   // make some text
  //   tmp_text_vect = vectorizeText(d, vect_text_attrs);

  //   tmp_text_vect.offset = [0, offsets[i]];

  //   // outside_text_vect.push(tmp_text_vect);


  // })

  // working on loop

  outside_text_vect = [];

  labels = ['one', 'two', 'three'];

  tmp_text_vect = vectorizeText(labels[0], vect_text_attrs);
  tmp_text_vect.offset = [0, -offsets[0]/10];
  outside_text_vect.push(tmp_text_vect);

  tmp_text_vect = vectorizeText(labels[1], vect_text_attrs);
  tmp_text_vect.offset = [0.0, -offsets[1]/10];
  outside_text_vect.push(tmp_text_vect);

  tmp_text_vect = vectorizeText(labels[2], vect_text_attrs);
  tmp_text_vect.offset = [0.0, -offsets[2]/10];
  outside_text_vect.push(tmp_text_vect);

  return outside_text_vect;


};