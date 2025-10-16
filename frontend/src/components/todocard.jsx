import { useState, useContext } from 'react';
import { TodoContext } from '../context/todoContext';

const Todocard = () => {
  const [input, setInput] = useState('');
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
 e.preventDefault();
      if (input.trim()) {
          addTodo(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row justify-center item-center gap-2 sm:gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full sm:flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Todocard;