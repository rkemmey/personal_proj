import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getNonogramPuzzles } from "../utilities";

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
    <>
      <div className="main-page-contents">
      <h2>Nonogram Puzzles</h2>
      <ol>
        {noData ? (noData.map((item, index) => (
          <li key={index}><Link to={`/nonogram/${item.id}`}>{item.id}</Link>
            </li>
        ))) : <p>fetching data</p>
        }
      </ol>
      </div>
    </>
  );
};