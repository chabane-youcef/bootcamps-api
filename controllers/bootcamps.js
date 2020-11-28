//* @desc           Get all bootcamps
//* @route          Get /api/v1/bootcamps
//* @access         Public                
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'show all bootcamps'
    });
}


//* @desc           Get single bootcamps
//* @route          Get /api/v1/bootcamps/:id
//* @access         Public                
exports.getBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            msg: `show bootcamp ${req.params.id}`
        });
}


//* @desc           create new bootcamp
//* @route          Post /api/v1/bootcamps
//* @access         private                
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `create new bootcamp`
    });
}

//* @desc           update bootcamp
//* @route          Put /api/v1/bootcamps/:id
//* @access         private                
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `update bootcamp ${req.params.id}`
    });
}

//* @desc           Delete bootcamp
//* @route          Delete /api/v1/bootcamps/:id
//* @access         private                
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`
    })
}