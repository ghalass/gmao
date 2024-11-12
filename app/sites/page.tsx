import Link from "next/link";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";

const SitesPage = () => {
  const sites = [
    {
      id: "1",
      name: "PG11",
    },
    {
      id: "2",
      name: "TO14",
    },
    {
      id: "3",
      name: "MHDTT",
    },
    {
      id: "4",
      name: "PG10",
    },
    {
      id: "5",
      name: "FDRK",
    },
    {
      id: "6",
      name: "AZ",
    },
  ];
  return (
    <div className="">
      <h1 className=" text-center d-flex align-items-center justify-content-center">
        <FaMapMarkerAlt className="text-secondary" />
        Liste des sites
      </h1>
      <div className="">
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Site</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id}>
                <td>{site.id}</td>
                <td>{site.name}</td>
                <td className="d-flex gap-1">
                  <Link
                    className="btn btn-sm btn-outline-info d-flex align-items-center gap-1"
                    href={`/sites/${site.id}/edit`}
                  >
                    <CiEdit />
                    Edit
                  </Link>
                  <Link
                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                    href={`/sites/${site.id}/delete`}
                  >
                    <CiTrash />
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SitesPage;
