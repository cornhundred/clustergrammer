const vectorizeText = require('vectorize-text');

module.exports = function row_label_text(){

  console.log('working on row label text')

  // detal: max ~200 min ~20
  var font_detail = 200;

  vect_text_attrs = {
    textAlign: 'right',
    textBaseline: 'middle',
    triangles:true,
    size:font_detail,
    font:'"Open Sans", verdana, arial, sans-serif'
  }

  // working on loop
  outside_text_vect = [];

  labels = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
  num_labels = labels.length;
  offsets = _.range(num_labels);

  _.each(labels, function(inst_label, i){

    tmp_text_vect = vectorizeText(inst_label, vect_text_attrs);
    tmp_text_vect.offset = [0, -offsets[i]/(2*num_labels)];
    outside_text_vect.push(tmp_text_vect);

  })

  return outside_text_vect;


};