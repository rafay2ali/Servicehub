import Service from "../models/Service.js";
import Review from "../models/Review.js";

export const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      location,
      isAvailable,
    } = req.body;

    console.log("Uploaded file:", req.file);

    console.log(
      "Cloudinary image URL:",
      req.file?.path
    );

    if (
      !title ||
      !description ||
      !category ||
      price === undefined ||
      !location
    ) {
      return res.status(400).json({
        message:
          "Title, description, category, price, and location are required",
      });
    }

    if (Number(price) < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message:
          "Service image is required",
      });
    }

    const imageUrl = req.file.path;

    if (!imageUrl) {
      return res.status(400).json({
        message:
          "Image upload failed. Cloudinary URL not found.",
      });
    }

    const service = await Service.create({
      title: title.trim(),

      description:
        description.trim(),

      category:
        category.trim(),

      price:
        Number(price),

      location:
        location.trim(),
      image:
        imageUrl,

      isAvailable:
        isAvailable !== undefined
          ? isAvailable
          : true,
      provider:
        req.user._id,
    });
    console.log(
      "Created service:",
      service
    );

    console.log(
      "Saved image URL:",
      service.image
    );

    return res.status(201).json({
      message:
        "Service created successfully",

      service,
    });

  } catch (error) {

    console.error(
      "Create service error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while creating service",
    });
  }
};

export const getAllServices = async (
  req,
  res
) => {
  try {
    const {
      search,
      category,
      location,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    const filter = {
      isAvailable: true,
    };

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (
      minPrice !== undefined ||
      maxPrice !== undefined
    ) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte =
          Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte =
          Number(maxPrice);
      }
    }

    const currentPage = Math.max(
      Number(page),
      1
    );

    const itemsPerPage = Math.max(
      Number(limit),
      1
    );

    const skip =
      (currentPage - 1) *
      itemsPerPage;

    let sortOption = {};

    switch (sort) {

      case "price-low":
        sortOption = {
          price: 1,
        };
        break;

      case "price-high":
        sortOption = {
          price: -1,
        };
        break;

      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "newest":
      default:
        sortOption = {
          createdAt: -1,
        };
        break;
    }

    
    const totalServices =
      await Service.countDocuments(
        filter
      );

    const services =
      await Service.find(filter)
        .populate(
          "provider",
          "name email"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(itemsPerPage)
        .lean();

    const providerIds =
      services
        .filter(
          (service) =>
            service.provider
        )
        .map(
          (service) =>
            service.provider._id
        );

    const reviewStats =
      providerIds.length > 0
        ? await Review.aggregate([
            {
              $match: {
                provider: {
                  $in: providerIds,
                },
              },
            },

            {
              $group: {
                _id:
                  "$provider",

                averageRating: {
                  $avg: "$rating",
                },

                totalReviews: {
                  $sum: 1,
                },
              },
            },
          ])
        : [];

  
    const reviewMap =
      new Map();

    reviewStats.forEach(
      (item) => {

        reviewMap.set(
          item._id.toString(),
          {
            averageRating:
              Number(
                item.averageRating.toFixed(
                  1
                )
              ),

            totalReviews:
              item.totalReviews,
          }
        );

      }
    );

    const servicesWithRatings =
      services.map(
        (service) => {

          const providerId =
            service.provider?._id?.toString();

          const ratingData =
            reviewMap.get(
              providerId
            ) || {
              averageRating: 0,
              totalReviews: 0,
            };

          return {
            ...service,

            averageRating:
              ratingData.averageRating,

            totalReviews:
              ratingData.totalReviews,
          };

        }
      );
    const totalPages =
      Math.ceil(
        totalServices /
          itemsPerPage
      );
    return res.status(200).json({
      message:
        "Services retrieved successfully",

      count:
        servicesWithRatings.length,

      totalServices,

      currentPage,

      itemsPerPage,

      totalPages,

      hasNextPage:
        currentPage <
        totalPages,

      hasPreviousPage:
        currentPage >
        1,

      services:
        servicesWithRatings,
    });

  } catch (error) {

    console.error(
      "Get services error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while retrieving services",
    });
  }
};

export const getServiceById = async (
  req,
  res
) => {
  try {

    const service =
      await Service.findById(
        req.params.id
      )
        .populate(
          "provider",
          "name email"
        )
        .lean();

    if (!service) {
      return res.status(404).json({
        message:
          "Service not found",
      });
    }
    const reviewStats =
      service.provider
        ? await Review.aggregate([
            {
              $match: {
                provider:
                  service.provider._id,
              },
            },

            {
              $group: {
                _id:
                  "$provider",

                averageRating: {
                  $avg: "$rating",
                },

                totalReviews: {
                  $sum: 1,
                },
              },
            },
          ])
        : [];

    const ratingData =
      reviewStats.length > 0
        ? {
            averageRating:
              Number(
                reviewStats[0].averageRating.toFixed(
                  1
                )
              ),

            totalReviews:
              reviewStats[0].totalReviews,
          }
        : {
            averageRating: 0,
            totalReviews: 0,
          };

    return res.status(200).json({
      message:
        "Service retrieved successfully",

      service: {
        ...service,

        averageRating:
          ratingData.averageRating,

        totalReviews:
          ratingData.totalReviews,
      },
    });

  } catch (error) {

    console.error(
      "Get service error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while retrieving service",
    });
  }
};


export const updateService = async (
  req,
  res
) => {
  try {

    const service =
      await Service.findById(
        req.params.id
      );

    if (!service) {
      return res.status(404).json({
        message:
          "Service not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      service.provider.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only update your own services",
      });
    }

    const updatedService =
      await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      message:
        "Service updated successfully",

      service:
        updatedService,
    });

  } catch (error) {

    console.error(
      "Update service error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while updating service",
    });
  }
};

export const deleteService = async (
  req,
  res
) => {
  try {

    const service =
      await Service.findById(
        req.params.id
      );

    if (!service) {
      return res.status(404).json({
        message:
          "Service not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      service.provider.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own services",
      });
    }

    await Service.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      message:
        "Service deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete service error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while deleting service",
    });
  }
};