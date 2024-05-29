const Skeleton = () => {
  return (
    <div className="flex flex-col items-start p-5 my-5 border border-gray-200 rounded-lg w-96 bg-white">
      <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse mb-4"></div>
      <div className="w-3/4 h-4 bg-gray-300 animate-pulse mb-2"></div>
      <div className="w-1/2 h-3 bg-gray-300 animate-pulse mb-4"></div>
      <div className="w-full h-3 bg-gray-300 animate-pulse mb-2"></div>
      <div className="w-full h-3 bg-gray-300 animate-pulse mb-2"></div>
      <div className="w-full h-3 bg-gray-300 animate-pulse mb-2"></div>
    </div>
  );
};

export default Skeleton;
