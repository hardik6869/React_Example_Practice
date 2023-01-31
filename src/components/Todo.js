import { useState } from "react";

const Todo = () => {
  const [input, setInput] = useState();
  const [items, setItems] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setItems([...items, input]);
    setInput("");
  };
  const deleteTodo = (id) => {
    let temp = [...items];
    temp.splice(id, 1);
    setItems(temp);
  };
  const editTodo = (id, val) => {
    setInput(val);
    let temp = [...items];
    temp.splice(id, 1);
    setItems(temp, val);
  };
  return (
    <div className="bg-gray-100 text-center my-5 container">
      <p className="text-3xl font-bold underline p-4"> Todo List </p>
      <form
        onSubmit={handleClick}
        className="d-flex items-center justify-center"
      >
        <div className="form-group">
          <input
            type="text"
            name="todoList"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2"
          />
          <button
            type="submit"
            className="m-2 px-4 py-2 bg-lime-500 text-white font-bold"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
      <div className=" align-center text-2xl">
        <ul className="list p-2 m-3 ">
          {items.map((item, index) => (
            <li key={index} className="my-5 justify-around d-flex">
              <div className="text-center">{item}</div>

              <div className="d-flex justify-around col-1 text-center">
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => editTodo(index, item)}
                ></i>
                <i className="fa-solid fa-square-plus"></i>
                <i
                  className="fa-sharp fa-solid fa-trash-can"
                  onClick={() => deleteTodo(index)}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
