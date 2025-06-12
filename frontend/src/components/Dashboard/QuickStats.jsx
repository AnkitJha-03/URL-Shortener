const QuickStats = ({ urls }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Total Links</h3>
          <p className="mt-1 text-2xl font-semibold text-blue-600">{urls.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Clicks</h3>
          <p className="mt-1 text-2xl font-semibold text-green-600">{urls.reduce((sum, url) => sum + url.clicks, 0)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800">Most Popular</h3>
          <p className="mt-1 text-sm font-medium text-purple-600 truncate">
            {urls.length > 0
              ? `${import.meta.env.VITE_BACKEND_URL + urls.reduce((prev, current) => (prev.clicks > current.clicks ? prev : current)).short_url}`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
