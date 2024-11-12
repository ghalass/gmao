import Link from "next/link";
import React from "react";
import { CiBoxList } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="row">
      <div className="col-sm-4">
        <div className="card">
          <div className="card-header text-center d-flex align-items-center justify-content-start gap-1">
            <FaMapMarkerAlt className="text-secondary " /> Gestion des sites
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link href={"/sites"} className="text-decoration-none py-0">
                <span className=" text-center d-flex align-items-center justify-content-start gap-1">
                  <CiBoxList /> Liste des sites
                </span>
              </Link>
            </li>

            <li className="list-group-item">
              <Link href={"/sites/new"} className="text-decoration-none py-0">
                <span className=" text-center d-flex align-items-center justify-content-start gap-1">
                  <MdOutlineAddLocationAlt /> Ajouter un nouveau
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="col">{children}</div>
    </div>
  );
};

export default layout;
