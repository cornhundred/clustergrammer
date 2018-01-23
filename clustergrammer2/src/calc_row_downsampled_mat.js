module.exports = function calc_row_downsampled_mat(params){
  console.log('calc_row_downsampled_mat')

  var mat_data = params.mat_data;

  _.each(mat_data, function(inst_row){
    console.log(inst_row.length);
  });

}