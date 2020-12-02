const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/bootcamp');

//* @desc           Get all bootcamps
//* @route          Get /api/v1/bootcamps
//* @access         Public                
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    const bootcamps = await Bootcamp.find();

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })

});


//* @desc           Get single bootcamps
//* @route          Get /api/v1/bootcamps/:id
//* @access         Public                
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with the id of of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: bootcamp
    });

});


//* @desc           create new bootcamp
//* @route          Post /api/v1/bootcamps
//* @access         private                
exports.createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp,
    });

});

//* @desc           update bootcamp
//* @route          Put /api/v1/bootcamps/:id
//* @access         private                
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with the id of of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: bootcamp,
    })



});

//* @desc           Delete bootcamp
//* @route          Delete /api/v1/bootcamps/:id
//* @access         private                
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with the id of of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: {}
    });

});

//* @desc           Get bootcamps within a radius
//* @route          GET /api/v1/bootcamps/radius/:zipcode/:distance
//* @access         Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {
        zipcode,
        distance
    } = req.params;

    //* Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //* calculate radius using radians
    //* Divide distance by radius of Earth
    //! Earth radius = 3,963 mil/ 6739km
    const radius = distance / 6379

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat], radius
                ]
            }
        }
    });

    res.status(200).json({
        success:true,
        count: bootcamps.length,
        data: bootcamps
    });
});