const Bootcamp = require('../models/bootcamp');

//* @desc           Get all bootcamps
//* @route          Get /api/v1/bootcamps
//* @access         Public                
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        })
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}


//* @desc           Get single bootcamps
//* @route          Get /api/v1/bootcamps/:id
//* @access         Public                
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({
                success: false
            });
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}


//* @desc           create new bootcamp
//* @route          Post /api/v1/bootcamps
//* @access         private                
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp,
        });
    } catch (err) {
        //? console.log(err);
        res.status(400).json({
            success: false
        });
    }
}

//* @desc           update bootcamp
//* @route          Put /api/v1/bootcamps/:id
//* @access         private                
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!bootcamp) {
            return res.status(400).json({
                success: false
            });
        }

        res.status(200).json({
            success: true,
            data: bootcamp,
        })
    } catch (error) {
        res.status(400).json({
            success: false
        });
    }


}

//* @desc           Delete bootcamp
//* @route          Delete /api/v1/bootcamps/:id
//* @access         private                
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            res.status(400).json({
                success: false
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false
        });
    }
}