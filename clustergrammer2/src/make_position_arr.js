module.exports = function make_position_arr(params){

  var network = params.network;

  var num_row = params.num_row;
  var num_col = params.num_col;

  // draw matrix cells
  /////////////////////////////////////////
  // set up offset array for buffer
  var offset = {};
  offset.x = 0.5;
  offset.y = 0.5;

  // generate x position array
  var x_arr = Array(num_col).fill()
    .map(function(_, i){
      return i/num_col - offset.x;
    });

  var y_arr = Array(num_row).fill()
    .map(function(_, i){
      return -i/num_row + offset.y - 1/num_row;
    });

  // pass along row and col node information
  var row_nodes = network.row_nodes;
  var col_nodes = network.col_nodes;

  // inst_order = 'rank';
  var inst_order = 'clust';

  /*
    working on saving actual row positions (downsampling)
  */
  params.row_positions = _.range(row_nodes.length);

  // generate x and y positions
  ////////////////////////////////
  function position_function(_, i){

    // looking up x and y position
    var col_id = i % num_col;
    var row_id = Math.floor(i / num_col);

    var row_order_id = num_row - 1 - row_nodes[row_id][inst_order];
    var col_order_id = num_col - 1 - col_nodes[col_id][inst_order];

    var x = x_arr[ col_order_id ];
    var y = y_arr[ row_order_id ];

    params.row_positions[row_id] = y;

    return [x, y];
  }

  var position_arr = Array(num_row * num_col)
            .fill()
            .map(position_function);

  return position_arr;

};