const vectorizeText = require('vectorize-text');

module.exports = function calc_row_text_triangles(params){
  console.log('calcluating row_text_triangles');

  var inst_nodes = params.network.row_nodes;
  var num_row = params.num_row;

  var row_height = 1/num_row;
  var y_offset_array = [];
  for (var i = 0; i < num_row; i++){
    y_offset_array[i] = 0.5 - row_height/2 - i * row_height;
  }

  // font_detail range: min ~12 max ~200
  ////////////////////////////////////////
  // usable range: 14-30
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

  // generating array with row text triangles and y-offsets
  var row_text_triangles = [];

  var inst_order = 'clust';

  _.each(inst_nodes, function(inst_node, row_id){

    var inst_name = inst_node.name.split(': ')[1];
    var tmp_text_vect = vectorizeText(inst_name, vect_text_attrs);
    var row_order_id = num_row - 1 -
                       params.network.row_nodes[row_id][inst_order];

    var y = y_arr[ row_order_id ];
    tmp_text_vect.offset = [ 0, y];
    row_text_triangles.push(tmp_text_vect);

  });

  return row_text_triangles;

};