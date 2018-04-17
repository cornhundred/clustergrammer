module.exports = function hex_to_rgbs(hex, alpha=1.0){

    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');


        var inst_r = (c>>16)&255;
        var inst_g = (c>>8)&255;
        var inst_b = c&255;

        // return '('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        return [inst_r, inst_g, inst_b, alpha];

    }

    // bad hex, return black
    return [0, 0, 0, alpha];
    // throw new Error('Bad Hex');

};