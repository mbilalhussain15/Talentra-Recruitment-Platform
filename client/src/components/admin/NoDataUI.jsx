const NoDataComponent = ({text}) => {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" 
          alt="No Admins" 
          className="w-24 h-24 opacity-50"
        />
        <h2 className="text-lg font-semibold text-gray-600 mt-4">
          No {text} Available
        </h2>
        <p className="text-sm text-gray-500">Please check back later.</p>
      </div>
    );
  };
  
  export default NoDataComponent;
  