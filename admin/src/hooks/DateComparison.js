import axios from "axios";
import { useCallback } from "react";

const DateComparison = () => {
//  const cancelToken = axios.CancelToken.source();
  const getDateComparison = useCallback(async (givenDate) => {
    const currentDate = new Date();

    // let result 
    // Convert the given date to a Date object
    const givenDateObj = new Date(givenDate);
  
    // Compare the two dates
    if (givenDateObj < currentDate) {
      return false;
    } else if (givenDateObj > currentDate) {
      return true;
    } else {
      return false;
    }
  


  }, []);

  return {  getDateComparison };
};

export default DateComparison;
