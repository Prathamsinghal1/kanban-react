import React, { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import Editable from "./Components/Editabled/Editable";
import "./App.css";
import Display from "./Components/Display/Display";

function App() {
  // const [boards, setBoards] = useState(() => {
  //   const storedBoards = JSON.parse(localStorage.getItem("prac-kanban"));
  //   return storedBoards || [];
  // });
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });

  const addBoard = (name) => {
    const newBoard = {
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    };
    setBoards([...boards, newBoard]);
  };

  const removeBoard = (id) => {
    const updatedBoards = boards.filter((board) => board.id !== id);
    setBoards(updatedBoards);
  };

  const addCard = (boardId, title) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === boardId) {
          const newCard = {
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: "",
            tasks: [],
          };
          return { ...board, cards: [...board.cards, newCard] };
        }
        return board;
      });
    });
  };

  const removeCard = (boardId, cardId) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === boardId) {
          const updatedCards = board.cards.filter((card) => card.id !== cardId);
          return { ...board, cards: updatedCards };
        }
        return board;
      });
    });
  };

  const handleDragEnded = (sourceBoardId, sourceCardId) => {
    // Implement drag-and-drop logic here and update the state
  };

  const handleDragEntered = (targetBoardId, targetCardId) => {
    setTargetCard({ bid: targetBoardId, cid: targetCardId });
  };

  const updateCard = (boardId, cardId, updatedCard) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === boardId) {
          const updatedCards = board.cards.map((card) => {
            if (card.id === cardId) {
              return { ...card, ...updatedCard };
            }
            return card;
          });
          return { ...board, cards: updatedCards };
        }
        return board;
      });
    });
  };

  

  const [boards, setBoards] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            try{
                let url = 'https://api.quicksell.co/v1/internal/frontend-assignment'
                let data = await fetch(url);
                let parsedData = await data.json();
                console.log(parsedData.tickets)
                setBoards(parsedData.tickets)
            }
            catch(error) {
                console.error(error)
            }
        }
        fetchData()
    },[])


  // useEffect(() => {
  //   const k = async ()=>{
  //   let data = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
  //   let parsedData = await data.json();
  //     let tickets = parsedData[0];
  //     let user = parsedData[1];
  //     console.log(tickets);
  //     console.log(user);
  //   }
  // }, []);


  return (
    <div className="app">
      <div className="container">
      <Display />
      </div>
{
      <div className="app_boards_container">
        <div className="app_boards">
          {boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              addCard={addCard}
              removeBoard={() => removeBoard(board.id)}
              removeCard={removeCard}
              dragEnded={handleDragEnded}
              dragEntered={handleDragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_last">
            <Editable
              displayclassName="app_boards_add-board"
              editclassName="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addBoard}
            />
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
