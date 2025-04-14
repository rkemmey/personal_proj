import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getSudokuPuzzles } from "../utilities";

export default function sudPage() {
  const [sudData, setSudData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchPuzzles = async () => {
        const data = await getSudokuPuzzles();
        setSudData(data);
      };
    
      fetchPuzzles();
    }, []);


//   const handleClick = (name) => {
//     console.log(name);
//     navigate(`/sudoku/${name}/`);
//   };

  // useEffect(() => {
  //   console.log(sudData);
  // }, [sudData]);



  return (
    <>
      <div className="main-page-contents">
      <h2>Sudoku Puzzles</h2>
      <ol>
        {sudData ? (sudData.map((item, index) => (
          <li key={index}><Link to={`/sudoku/${item.id}`}>{item.id}</Link>
            </li>
        ))) : <p>fetching data</p>
        }
      </ol>
      </div>
    </>
  );
};
