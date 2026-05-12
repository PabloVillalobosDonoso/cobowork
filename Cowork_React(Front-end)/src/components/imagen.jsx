import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
        cloud: {
        cloudName: "dcgy9tonn", //Cloudname de la cuenta de cloudinary
    },
});

const Imagen = ({
    publicId,
    alt = "imagen",
    className = "card-img-top",
    }) => {
    const img = cld
        .image(publicId)
        .format("auto")
        .quality("auto:best");


    return (
        <AdvancedImage
        cldImg={img}
        alt={alt}
        className={className}
        />
    );
};

export default Imagen;