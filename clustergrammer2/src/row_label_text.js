const vectorizeText = require('vectorize-text');

module.exports = function row_label_text(params){

  var inst_nodes = params.network.row_nodes;

  // inst_nodes = inst_nodes.slice(0, 10);

  var num_rows = params.num_row;

  // console.log(num_rows);

  var row_height = 1/num_rows;
  var y_offset_array = [];
  for (var i = 0; i < num_rows; i++){
    y_offset_array[i] = 0.5 - row_height/2 - i * row_height;
  }

  // console.log(y_offset_array);

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

  // console.log(offsets);

  _.each(inst_nodes, function(inst_node, i){
    var inst_name = inst_node.name.split(': ')[1];

    var tmp_text_vect = vectorizeText(inst_name, vect_text_attrs);
    tmp_text_vect.offset = [-53.0, -y_offset_array[i]*3800/num_labels];
    outside_text_vect.push(tmp_text_vect);

  });

  // console.log('finished calculating text triangles');
  return outside_text_vect;


};