const vectorizeText = require('vectorize-text');

module.exports = function row_label_text(inst_nodes){

  inst_nodes = inst_nodes.slice(0, 10);

  // console.log('calculating text-triangles');

  // detal: max ~200 min ~20
  // usable range: 12-30
  var font_detail = 25;

  var vect_text_attrs = {
    textAlign: 'right',
    textBaseline: 'middle',
    triangles:true,
    size:font_detail,
    font:'"Open Sans", verdana, arial, sans-serif'
  };

  // working on loop
  var outside_text_vect = [];

  var num_labels = inst_nodes.length;
  var offsets = _.range(num_labels);

  _.each(inst_nodes, function(inst_node, i){
    var inst_name = inst_node.name.split(': ')[1];

    var tmp_text_vect = vectorizeText(inst_name, vect_text_attrs);
    tmp_text_vect.offset = [-53.0, -offsets[i]/(num_labels/10)];
    outside_text_vect.push(tmp_text_vect);

  });

  // console.log('finished calculating text triangles');
  return outside_text_vect;


};