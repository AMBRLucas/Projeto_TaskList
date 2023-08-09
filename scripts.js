// Seleção do campo de digitação
const inputElement = document.querySelector('.new-task-input');
// Seleção do botão de envio das informações
const addTaskbutton = document.querySelector('.new-task-button');
// Seleção da area onde aparecerao as tarefas
const tasksContainer = document.querySelector('.tasks-container');

// Validação do campo de digitação
const validateInput = () => inputElement.value.trim().length > 0;

// Checa se o valor digitado é valido, se for valido adiciona a tarefa
const handleAddTask = () => {
    const inputIsValid = validateInput();

    if(!inputIsValid){
        return inputElement.classList.add('error');
    };

    // Criação dos elementos HTML que conterão as informações
    // Container para as informações
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    // Conteudo do container
    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    // Evento de clique no conteudo da tarefa para marca la como concluida
    taskContent.addEventListener('click', () => handleClick(taskContent));

    // Criação do botão de deletar tarefa
    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-regular');
    deleteItem.classList.add('fa-trash-can');

    // Evento de clique no botão de deletar tarefa
    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    //Colocando as informacoes dentro da div criada
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    
    // Fazendo aparecer os elementos criados na tela
    tasksContainer.appendChild(taskItemContainer);

    // Zerando o valor do campo depois de adicionar a tarefa
    inputElement.value = '';

    // Atualizando o Armazenamento local do navegador
    updateLocalStorage()
};

// Funcao de clique na tarefa para marcar como concluida
const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle('completed');
        };
    }

    // Atualizando o Armazenamento local do navegador
    updateLocalStorage()
};

// Funcao para deletar uma tarefa

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){
            taskItemContainer.remove()
        };
    };

    // Atualizando o Armazenamento local do navegador
    updateLocalStorage()
};

// Responsavel pela estilização relativa do campo de digitação
const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove('error');
    };
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return {description: content.innerText, isCompleted};
    });

    console.log({localStorageTasks});

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage) return;
    
    for(const task of tasksFromLocalStorage){
         // Criação dos elementos HTML que conterão as informações
        // Container para as informações
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');

        // Conteudo do container
        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;

        if(task.isCompleted){
            taskContent.classList.add('completed');
        }

        // Evento de clique no conteudo da tarefa para marca la como concluida
        taskContent.addEventListener('click', () => handleClick(taskContent));

        // Criação do botão de deletar tarefa
        const deleteItem = document.createElement('i');
        deleteItem.classList.add('fa-regular');
        deleteItem.classList.add('fa-trash-can');

        // Evento de clique no botão de deletar tarefa
        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

        //Colocando as informacoes dentro da div criada
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        
        // Fazendo aparecer os elementos criados na tela
        tasksContainer.appendChild(taskItemContainer);
    }
};


// Atualiza a lista de tarefas com base no local storage
refreshTasksUsingLocalStorage()

//Criação do evento de clique no botão, que chamara a funcao de adicionar tarefas
addTaskbutton.addEventListener('click', () => handleAddTask());

// Evento de mudança no conteudo do campo para estilização relativa
inputElement.addEventListener('change', () => handleInputChange());