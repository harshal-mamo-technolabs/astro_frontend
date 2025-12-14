import { useState } from "react";
const users = [
  {
    id: 1,
    name: "User 1",
    email: "user1@example.com",
    joined: "2024-04-01",
    referral: "Referral 1",
    zodiacSign: "Aries",
  },
  {
    id: 2,
    name: "User 2",
    email: "user2@example.com",
    joined: "2024-04-01",
    referral: "Referral 2",
    zodiacSign: "Taurus",
  },
  {
    id: 3,
    name: "User 3",
    email: "user3@example.com",
    joined: "2024-04-01",
    referral: "Referral 3",
    zodiacSign: "Gemini",
  },
  {
    id: 4,
    name: "User 4",
    email: "user4@example.com",
    joined: "2024-04-01",
    referral: "Referral 4",
    zodiacSign: "Cancer",
  },
  {
    id: 5,
    name: "User 5",
    email: "user5@example.com",
    joined: "2024-04-01",
    referral: "Referral 5",
    zodiacSign: "Leo",
  },
  {
    id: 6,
    name: "User 6",
    email: "user6@example.com",
    joined: "2024-04-01",
    referral: "Referral 6",
    zodiacSign: "Virgo",
  },
  {
    id: 7,
    name: "User 7",
    email: "user7@example.com",
    joined: "2024-04-01",
    referral: "Referral 7",
    zodiacSign: "Libra",
  },
  {
    id: 8,
    name: "User 8",
    email: "user8@example.com",
    joined: "2024-04-01",
    referral: "Referral 8",
    zodiacSign: "Scorpio",
  },
  {
    id: 9,
    name: "User 9",
    email: "user9@example.com",
    joined: "2024-04-01",
    referral: "Referral 9",
    zodiacSign: "Sagittarius",
  },
  {
    id: 10,
    name: "User 9",
    email: "user9@example.com",
    joined: "2024-04-01",
    referral: "Referral 9",
    zodiacSign: "Sagittarius",
  },
  {
    id: 11,
    name: "User 9",
    email: "user9@example.com",
    joined: "2024-04-01",
    referral: "Referral 9",
    zodiacSign: "Sagittarius",
  },
  {
    id: 12,
    name: "User 9",
    email: "user9@example.com",
    joined: "2024-04-01",
    referral: "Referral 9",
    zodiacSign: "Sagittarius",
  },
  {
    id: 13,
    name: "User 9",
    email: "user9@example.com",
    joined: "2024-04-01",
    referral: "Referral 9",
    zodiacSign: "Sagittarius",
  },
];

const TransparentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(users);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchResults.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(searchResults.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredUsers);
    setCurrentPage(1); // Reset pagination to the first page when searching
  };

  return (
    <div className="bg-transparent p-6 lg:w-[80%] w-full">
      <div className="overflow-x-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search user"
          className="bg-white border border-gray-300 text-black rounded-md p-2 mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-2 rounded-md mb-4 m-2"
        >
          Search
        </button>
        <table className="w-full table-auto bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-3">ID</th>
              <th className="border border-gray-300 p-3">Name</th>
              <th className="border border-gray-300 p-3">Email</th>
              <th className="border border-gray-300 p-3">Joined</th>
              <th className="border border-gray-300 p-3">Zodiac Sign</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-3">{user.id}</td>
                <td className="border border-gray-300 p-3">{user.name}</td>
                <td className="border border-gray-300 p-3">{user.email}</td>
                <td className="border border-gray-300 p-3">{user.joined}</td>
                <td className="border border-gray-300 p-3">
                  {user.zodiacSign}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <ul className="flex list-none">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-1 mr-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 hover:bg-gray-200"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransparentTable;
