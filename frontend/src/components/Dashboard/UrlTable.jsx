import { FiExternalLink, FiCopy, FiBarChart2, FiTrash2 } from "react-icons/fi";

const UrlTable = ({
  urls,
  allUrls,
  copiedUrl,
  searchTerm,
  sortConfig,
  handleCopy,
  handleDelete,
  handleSort,
  setSearchTerm,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your links..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("long_url")}
              >
                <div className="flex items-center">
                  Original URL
                  {sortConfig.key === "long_url" && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("short_url")}
              >
                <div className="flex items-center">
                  Short URL
                  {sortConfig.key === "short_url" && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("clicks")}
              >
                <div className="flex items-center">
                  Clicks
                  {sortConfig.key === "clicks" && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center">
                  Created
                  {sortConfig.key === "createdAt" && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.length > 0 ? (
              urls.map((url) => (
                <tr key={url._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiExternalLink className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          <a
                            href={url.long_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                          >
                            {url.long_url}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-600 flex items-center">
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL + url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-800 mr-2"
                      >
                        {import.meta.env.VITE_BACKEND_URL + url.short_url}
                      </a>
                      <button
                        onClick={() => handleCopy(url.short_url)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy to clipboard"
                      >
                        <FiCopy className={`h-4 w-4 ${copiedUrl === url.short_url ? "text-green-500" : ""}`} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {url.clicks}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* TO-DO: Implement analytics link */}
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50"
                        title="View Analytics"
                      >
                        <FiBarChart2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(url)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                        title="Delete"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  {allUrls.length === 0 ? "You have no shortened URLs yet." : "No URLs match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlTable;
