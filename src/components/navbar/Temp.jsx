const Temp = ({ data }) => {
    const keysArray = Object.keys(data);
  
    return (
      <div>  
        {keysArray.map((key) => (
            <div key={key}>
              <strong>{key}:</strong> {data[key]}
            </div>
          ))}
      </div>
    );
  };
  
  export default Temp;