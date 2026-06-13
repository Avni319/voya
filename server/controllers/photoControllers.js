import Photo from "../models/Photo.js";
import cloudinary from "../config/cloudinary.js";



// CREATE PHOTO

export const uploadPhoto = async (
  req,
  res
) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("CLOUD:", process.env.CLOUDINARY_CLOUD_NAME);

    const { tripId, caption } =
      req.body;

    const file =
      req.file.buffer.toString("base64");

    const result =
      await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${file}`,
        {
          folder: "voya",
        }
      );

    const photo =
      await Photo.create({
        tripId,
        caption,
        imageUrl: result.secure_url,
      });

    res.status(201).json(photo);

} catch (error) {

  console.log("PHOTO ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
};

// GET PHOTOS OF TRIP

export const getTripPhotos = async (
  req,
  res
) => {
  try {
    const photos = await Photo.find({
      tripId: req.params.tripId,
    });

    res.status(200).json(photos);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE PHOTO

export const deletePhoto = async (
  req,
  res
) => {
  try {
    const photo = await Photo.findById(
      req.params.id
    );

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }

    await Photo.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Photo deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};