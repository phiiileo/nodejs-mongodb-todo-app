    const todos = document.querySelectorAll("ul li");
    const task_form = document.getElementById('task_form');
    const closeBtn = document.querySelectorAll('.close')

    todos.forEach(todo => {
        todo.addEventListener('click', (event) => {
            const status = todo.classList.value
            if (status == 'done') {
                todo.classList.remove('done');
                todo.done = false
            } else {
                todo.done = true
                todo.classList.add('done')
            }
            event.stopPropagation();
            finishTask(todo)
        })
    })

    closeBtn.forEach((close, ) => {
        close.addEventListener('click', (event) => {
            event.stopPropagation();
            let _id = close.id.replace('_', "");
            console.log(_id)

            deleteTask(_id)
        }, false)
    })
    task_form.addEventListener('submit', handleSubmit)

    function handleSubmit(event) {
        _formData = new FormData(task_form)
        _formData.set('name', "hello world");
    }

    const finishTask = (task) => {
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: task.id,
                done: task.done
            })
        }
        fetch('/update-todos', config)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    const deleteTask = (task_id) => {
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: task_id
            })
        }
        fetch('/todos', config)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                todos.forEach(todo => {
                    if (todo.id == data.data._id) {
                        console.log(todo.id, data.data._id)
                        todo.classList.add('hide')
                    }
                })
            })
    }