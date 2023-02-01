import React, { useRef, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const inputRef = useRef(null);

  // Add Todo
  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    setTodos([...todos, { id: Date.now(), text: inputRef.current.value }]);
    inputRef.current.value = "";
  };

  // Update Todo
  const updateTodo = (item) => {
    if (!isUpdate) {
      setIsUpdate(!isUpdate);
      inputRef.current.value = item.text;
    } else {
      setIsUpdate(!isUpdate);
      setTodos(
        todos.filter((todo) => {
          if (todo.id === item.id) {
            todo.text = inputRef.current.value;
          }
          return todo;
        })
      );
    }
  };

  // Delete Todo
  const deleteTodo = (item) => {
    setTodos(todos.filter((todo) => todo.id !== item.id));
  };

  return (
    <div className="bg-gray-100 text-center my-5 container">
      <p className="text-3xl font-bold underline p-4"> Todo List </p>
      <div className="form-group">
        <input
          type="text"
          name="todoList"
          ref={inputRef}
          className="p-2"
          required
        />
        <button
          onClick={handleClick}
          className="m-2 px-4 py-2 bg-lime-500 font-bolder text-white"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className=" align-center">
        <ul className="list p-2 m-3">
          {todos.map((item, index) => (
            <div key={index}>
              {console.warn("items", todos)}
              <li
                key={index}
                className="my-5 justify-between d-flex text-2xl mx-5"
              >
                <div className="text-center">{item.text}</div>
                {isUpdate && (
                  <input type="text" value={todos.text} className="w-23" />
                )}
                <div className="d-flex justify-between col-2 text-center">
                  {isUpdate ? (
                    <>
                      <i
                        class="fa-solid fa-plus-minus cursor-pointer text-blue-500"
                        onClick={() => updateTodo(item)}
                      ></i>
                      <i
                        className="fa-solid fa-circle-xmark cursor-pointer text-yellow-500"
                        onClick={() => setIsUpdate(!isUpdate)}
                      ></i>
                    </>
                  ) : (
                    <i
                      className="fa-solid fa-pen-to-square cursor-pointer text-orange-500"
                      onClick={() => updateTodo(item)}
                    ></i>
                  )}
                  <i
                    className="fa-sharp fa-solid fa-trash-can cursor-pointer text-red-500"
                    onClick={() => deleteTodo(item)}
                  ></i>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
