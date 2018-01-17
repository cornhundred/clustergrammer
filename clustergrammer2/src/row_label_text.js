const vectorizeText = require('vectorize-text');

module.exports = function row_label_text(params){

  var inst_nodes = params.network.row_nodes;

  // inst_nodes = inst_nodes.slice(0, 10);

  var num_row = params.num_row;

  // console.log(num_row);

  var row_height = 1/num_row;
  var y_offset_array = [];
  for (var i = 0; i < num_row; i++){
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

  // draw matrix cells
  /////////////////////////////////////////
  // set up offset array for buffer
  var offset = {};
  offset.x = 0.5;
  offset.y = 0.5;

  var y_arr = Array(num_row).fill()
    .map(function(_, i){
      // return -i/num_row + offset.y - 1/num_row;
      return -i/num_row + offset.y - 0.5/num_row;
    });

  // working on loop
  var outside_text_vect = [];

  var inst_order = 'clust';

  _.each(inst_nodes, function(inst_node, row_id){

    var inst_name = inst_node.name.split(': ')[1];

    var tmp_text_vect = vectorizeText(inst_name, vect_text_attrs);

    var row_order_id = num_row - 1 - params.network.row_nodes[row_id][inst_order];

    var y = y_arr[ row_order_id ];

    // console.log(row_id, inst_name, row_order_id, tmp, y)

    // 100: 53
    // 90: 48

    tmp_text_vect.offset = [  0, y];

    outside_text_vect.push(tmp_text_vect);

  });

  // console.log('finished calculating text triangles');
  return outside_text_vect;

};