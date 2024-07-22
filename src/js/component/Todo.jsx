import React, { useState, useEffect } from 'react';

function Todo() {
    const [inputValues, setInputValues] = useState(['', '', '', '', '']);
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        // Obtener las tareas de la API cuando el componente se monta
        fetch('https://playground.4geeks.com/todo/user/alesanchezr')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTodo(data);
                } else {
                    console.error('API response is not an array:', data);
                    setTodo([]);
                }
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
                setTodo([]);
            });
    }, []);

    const updateTodosOnServer = (newTodos) => {
        // Actualizar la lista de tareas en el servidor
        fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodos),
        })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setTodo(data);
            } else {
                console.error('API response is not an array:', data);
                setTodo(newTodos);
            }
        })
        .catch(error => {
            console.error('Error updating todos:', error);
            setTodo(newTodos);
        });
    };

    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter' && inputValues[index].trim() !== '') {
            const newTodo = [...todo, inputValues[index]];
            setTodo(newTodo);
            updateTodosOnServer(newTodo);
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
        const newTodo = todo.filter((_, i) => i !== index);
        setTodo(newTodo);
        updateTodosOnServer(newTodo);
    };

    const handleClearAll = () => {
        fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
            setTodo([]);
        })
        .catch(error => console.error('Error clearing todos:', error));
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
                <button className='btn btn-warning btn-sm ms-2' onClick={handleClearAll}>Clear All</button>
            </div>
        </div>
    );
}

export default Todo;
