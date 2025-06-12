import UrlForm from "../components/Home/UrlForm";
import RecentUrls from "../components/Home/RecentUrls";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Shorten Your Links in Seconds</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create short, memorable URLs and track their performance with our powerful analytics.
          </p>
        </div>

        <UrlForm />
        <RecentUrls />
      </div>
    </div>
  );
};

export default HomePage;
