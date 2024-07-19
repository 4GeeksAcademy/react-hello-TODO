import React, { useState } from 'react';

function Todo() {
    const [inputValues, setInputValues] = useState(['', '', '', '', '']);
    const [todo, setTodo] = useState([]);

    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter' && inputValues[index].trim() !== '') {
            setTodo([...todo, inputValues[index]]);
            const newInputValues = [...inputValues];
            newInputValues[index] = '';
            setInputValues(newInputValues);
        }
    };

    const handleInputChange = (e, index) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value;
        setInputValues(newInputValues);
    };

    const handleDelete = (index) => {
        setTodo(todo.filter((_, i) => i !== index));
    };

    const placeholders = [
        'Wash my hands',
        'Make the bed',
        'Pay Taxes',
        'Pay Bills',
        'Read a book'
    ];

    return (
        <div className='container'>
            <h1 className='text-body-tertiary mt-5'>TODOS</h1>
            <ul className='list-group mb-3'>
                {placeholders.map((placeholder, index) => (
                    <li key={index} className='list-group-item'>
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={inputValues[index]}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            onChange={(e) => handleInputChange(e, index)}
                            className='form-control'
                        />
                    </li>
                ))}
            </ul>
            <ul className='list-group'>
                {todo.map((task, index) => (
                    <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                        {task}
                        <button className='btn btn-danger btn-sm' onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div className='mt-3'>
                <span>{todo.length} item{todo.length !== 1 ? 's' : ''} left</span>
            </div>
        </div>
    );
}

export default Todo;
