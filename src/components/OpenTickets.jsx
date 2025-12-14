import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupportData } from "../context/SupoortContext";

const OpenTickets = () => {
  const { list } = useSupportData();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState("");
  const [searchInput, setSearchInput] = useState(""); // New state for search input
  const entriesPerPage = 5;

  const sortedTickets = [...list]
    .filter((ticket) => !ticket.closed)
    .filter((ticket) =>
      ticket.title.toLowerCase().includes(searchInput.toLowerCase())
    ) 
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Paginate tickets
  const paginatedTickets = sortedTickets.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleRowClick = (record) => {
    navigate(`/home/chat/open/${record._id}`);
  };

  // Calculate total pages
  const totalPages = Math.ceil(sortedTickets.length / entriesPerPage);

  // Generate array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = () => {
    if (pageNumberInput.trim() !== "") {
      const pageNumber = parseInt(pageNumberInput);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    }
    setPageNumberInput("");
  };

  return (
    <div className="overflow-y-scroll lg:overflow-y-auto">
      <div className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by title..."
          className="px-2 py-1 rounded-md border border-gray-400"
          style={{ width: "200px" }}
        />
      </div>
      {paginatedTickets.length === 0 ? (
        <div className="text-white text-center">Ticket Not Found</div>
      ) : (
        <table className="min-w-full divide-y bg-[#33175b] border-2 text-white">
          <thead>
            <tr className="text-semibold text-white">
              <th
                scope="col"
                className="px-6 py-3 text-left uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs uppercase tracking-wider"
              >
                Closed
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs uppercase tracking-wider"
              >
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#33175b] border-2 text-white divide-y ">
            {paginatedTickets.map((record) => (
              <tr
                key={record._id}
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => handleRowClick(record)}
              >
                <td className="px-6 py-4 whitespace-nowrap">{record.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.closed ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(record.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(record.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {sortedTickets.length > entriesPerPage && (
        <div className="flex flex-col items-center justify-center m-2 mt-4">
          <div>
            <button
              className={`text-white px-4 py-2 rounded-md mr-2 ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage > 1 ? prevPage - 1 : prevPage
                )
              }
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-4 py-2 rounded-md mx-1 ${
                  pageNumber === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-gray-200"
                }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={`text-white px-4 py-2 rounded-md ml-2 ${
                currentPage === totalPages ? "cursor-not-allowed" : ""
              }`}
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage < totalPages ? prevPage + 1 : prevPage
                )
              }
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>

          <div>
            <div className="mt-4">
              <input
                type="text"
                value={pageNumberInput}
                onChange={(e) => setPageNumberInput(e.target.value)}
                className="px-2 py-1 rounded-md border border-gray-400"
                style={{ width: "60px" }}
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                onClick={goToPage}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenTickets;
