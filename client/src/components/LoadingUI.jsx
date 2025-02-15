const LoadingAnimation = ({ count = 5 }) => {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index} 
            className="h-[65px] w-full bg-gray-200 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    );
  };
  
  export default LoadingAnimation;
  