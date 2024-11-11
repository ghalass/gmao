import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const DeletePage = () => {
  return (
    <div>
      <h1 className=" text-center d-flex align-items-center justify-content-center">
        <FaMapMarkerAlt className="text-secondary" />
        Supprimer un site
      </h1>
    </div>
  );
};

export default DeletePage;
