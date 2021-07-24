import React from "react";
import PropTypes from "prop-types";

import Image from "./Image";

const ImageList = ({ imagenes }) => {
  return (
    <div className="col-12 p-5 row">
      {imagenes.map(imagen => (
        <Image key={imagen.id} imagen={imagen} />
      ))}
    </div>
  );
};

ImageList.propTypes = {
  imagenes: PropTypes.array.isRequired
};

export default ImageList;
