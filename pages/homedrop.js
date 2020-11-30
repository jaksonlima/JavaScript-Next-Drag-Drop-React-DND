import { createContext, useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const collections = [
  { id: 1, status: "MOVE" },
  { id: 2, status: "DONE" },
  { id: 3, status: "MOVE" },
  { id: 4, status: "DONE" },
  { id: 5, status: "MOVE" },
  { id: 6, status: "DONE" },
  { id: 7, status: "MOVE" },
  { id: 8, status: "DONE" },
  { id: 9, status: "MOVE" },
];

const ItemTypes = {
  KNIGHT: "Knight",
};

const DragDropContext = createContext({
  markAsDone: null,
});

function Drag({ color, item, ...rest }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT, item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <>
      <div
        {...rest}
        ref={drag}
        style={{
          width: "100px",
          height: "100px",
          fontWeight: "bold",
          cursor: "move",
          fontSize: 40,
          backgroundColor: color,
          textAlign: "center",
          fontSize: "70px",
          opacity: isDragging ? 0.3 : 1,
        }}
      >
        {item.id % 2 === 0 ? <>🛡️</> : <>⚜️</>}
      </div>
    </>
  );
}

function Drop({ children }) {
  const { markAsDone } = useContext(DragDropContext);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: ({ item }, monitor) => {
      markAsDone(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: "300px",
        height: "300px",
        display: "flex",
        flexWrap: "wrap",
        margin: "20px",
        backgroundColor: isOver ? "greenyellow" : "tomato",
      }}
    >
      {children}
    </div>
  );
}

function HomeDragDrop() {
  const [itens, setItens] = useState(collections);

  const markAsDone = (id) => {
    const item = itens.filter((item) => item.id === id);
    item[0].status = item[0].status === "DONE" ? "MOVE" : "DONE";
    setItens(itens.filter((item) => item.id !== id).concat(item[0]));
  };

  return (
    <DragDropContext.Provider value={{ markAsDone }}>
      <div style={{ boxSizing: "border-box", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Drop>
          {itens
            .filter((item) => item.status !== "DONE")
            .map((item) => (
              <Drag key={item.id} color={item.id % 2 === 0 ? "red" : "blue"} item={item} />
            ))}
        </Drop>

        <Drop>
          {itens
            .filter((item) => item.status === "DONE")
            .map((item) => (
              <Drag key={item.id} color={item.id % 2 === 0 ? "red" : "blue"} item={item} />
            ))}
        </Drop>
      </div>
    </DragDropContext.Provider>
  );
}

export default HomeDragDrop;
