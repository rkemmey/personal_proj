import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getNonogramPuzzles } from "../utilities";
import NonoPuzzleCard from "../components/NonoPuzzleCard";

export default function NonoPage() {
  const [noData, setNoData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchPuzzles = async () => {
        const data = await getNonogramPuzzles();
        setNoData(data);
      };
    
      fetchPuzzles();
    }, []);



  return (
    // <>
    //   <div className="main-page-contents">
    //   <h2>Nonogram Puzzles</h2>
    //   <ol>
    //     {noData ? (noData.map((item, index) => (
    //       <li key={index}><Link to={`/nonogram/${item.id}`}>{item.id}</Link>
    //         </li>
    //     ))) : <p>fetching data</p>
    //     }
    //   </ol>
    //   </div>
    // </>
    <>
    <div className="main-page-contents px-3 py-3">
    <h2 className="mt-1 mb-4">Nonogram Puzzles</h2>
      {noData ? (
        <div className="row">
          {noData.map((item, index) => (
            <NonoPuzzleCard key={index} id={item.id} />
          ))}
        </div>
      ) : (
        <p>fetching data</p>
      )}
    </div>
  </>
  );
};