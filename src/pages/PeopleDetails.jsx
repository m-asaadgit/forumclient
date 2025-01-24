

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { maleFetchApprovedData } from "../redux/Slice/publicApprovedData";
import Loader from "../components/Loader";

function PeopleDetails() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.maleApprovedData
  );
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    dispatch(maleFetchApprovedData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const sortingData = [...data].sort((a, b) => {
        const countFilledProperties = (obj) => {
          return Object.values(obj).filter(
            (value) => value !== null && value !== undefined && value !== ""
          ).length;
        };
        return countFilledProperties(b) - countFilledProperties(a); // Descending order
      });
      setSortedData(sortingData);
    }
  }, [data]);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white w-full relative px-4 md:pt-[25vh] pt-[15vh] md:px-[2%] md:min-h-[110vh] min-h-[95vh] flex flex-col tb:flex-row flex-wrap gap-1 justify-center py-4">
      <div className="flex  w-[100%] flex-wrap gap-2 justify-center">
        {sortedData.length ? (
          sortedData.map((item) => (
            <div
              key={item._id}
              className="md:w-[30%] w-full mb-2 flex tb:flex-wrap h-[28vh] tb:h-[25vh] md:h-[35vh] tb:w-[45%] hover:scale-[101%] transition-all duration-150 rounded-sm shadow-2xl shadow-slate-900 bg-gray-900"
            >
              <div className="w-[42%] h-full flex flex-col items-center pt-4">
                <div className="w-[80%] h-[80%]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full rounded-lg h-full"
                  />
                </div>
              </div>
              <div className="w-[56%] overflow-hidden pt-6 md:text-md text-sm h-full bg-slate-900 flex flex-col">
                <h1 className="text-white font-semibold">{item.name}</h1>
                <p className="text-white">
                  <span className="font-semibold text-slate-400">
                    Father Name:{" "}
                  </span>
                  {item.father}
                </p>
              
                <p className="text-white">
                  <span className="font-semibold text-slate-400">Age: </span>
                  {Math.floor(
                    item.age +
                      (Date.now() - new Date(item.createdAt)) /
                        (1000 * 60 * 60 * 24 * 365.25)
                  )}
                </p>
                <div className="w-full h-[25%] relative flex justify-start px-2 gap-2">
                  <Link
                    className="bg-yellow-400 shadow-2xl shadow-slate-900 text-black px-2 font-semibold h-fit flex gap-1 items-center py-[3px] hover:scale-110 transition-all duration-200 w-fit mt-2 rounded-sm"
                    to={`/info/${item._id}`}
                  >
                    See more <FaArrowTrendUp />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black flex items-center justify-center">
            No approved data available.
            <span className="opacity-0">s</span>
            <Link
              to="/fill-form"
              className="text-blue-900 font-semibold underline"
            >
              Click here to be the first to get enrolled
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default PeopleDetails;
