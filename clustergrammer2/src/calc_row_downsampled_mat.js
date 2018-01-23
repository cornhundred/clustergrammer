module.exports = function calc_row_downsampled_mat(params){
  console.log('calc_row_downsampled_mat')

  var mat_data = params.mat_data;
  var row_pos = params.row_positions;
  var ds_mat = [];
  var inst_pos;

  // params.mat_data = params.mat_data.slice(0,5);
  // params.is_downsample = true;


  /*
    row_pos go from -0.5 to 0.5
  */

  // // make 10 positions
  // var new_pos = _.range(-0.5, 0.5, 0.1);
  // console.log(new_pos.length);

  // mod_value = 0.1;

  // _.each(mat_data, function(inst_row, inst_index){

  //   inst_pos = row_pos[inst_index];

  //   ds_pos = Math.round(inst_pos/mod_value);

  //   console.log('inst_pos: ', inst_pos);
  //   console.log('ds_pos', ds_pos)
  //   console.log('\n');

  // });



}