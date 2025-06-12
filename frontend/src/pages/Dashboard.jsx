import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { delete_url } from "../api/short_url.api";
import UrlTable from "../components/Dashboard/UrlTable";
import Pagination from "../components/Dashboard/Pagination";
import QuickStats from "../components/Dashboard/QuickStats";
import useAuthStore from "../stores/auth.store";

const Dashboard = () => {
  const urls = useAuthStore((state) => state.urls);
  const removeUrl = useAuthStore((state) => state.removeUrl);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 10;

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL + shortUrl}`);
    setCopiedUrl(shortUrl);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (url) => {
    try {
      await delete_url(url);
      removeUrl(url);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // sort and filter logic
  const sortedUrls = [...urls].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredUrls = sortedUrls.filter(
    (url) =>
      url.long_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.short_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);
  const totalPages = Math.ceil(filteredUrls.length / urlsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Links</h1>
            <p className="text-gray-600 mt-2">Manage and analyze your shortened URLs</p>
          </div>
          <Link
            to="/"
            className="mt-4 md:mt-0 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            Shorten New URL
          </Link>
        </div>

        <UrlTable
          urls={currentUrls}
          allUrls={urls}
          copiedUrl={copiedUrl}
          searchTerm={searchTerm}
          sortConfig={sortConfig}
          handleCopy={handleCopy}
          handleDelete={handleDelete}
          handleSort={handleSort}
          setSearchTerm={setSearchTerm}
        />

        {filteredUrls.length > urlsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstUrl={indexOfFirstUrl}
            indexOfLastUrl={indexOfLastUrl}
            filteredUrls={filteredUrls}
            paginate={paginate}
            setCurrentPage={setCurrentPage}
          />
        )}

        <QuickStats urls={urls} />
      </div>
    </div>
  );
};

export default Dashboard;
