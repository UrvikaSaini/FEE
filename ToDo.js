(function () {
    let toDoObj = {};
    let toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];
    const heading = document.createElement("h1");
    const ToDo = document.getElementById("to-do");
    const AddTask = document.createElement("div");
    const Input = document.createElement("input");
    const AddBtn = document.createElement("button");
    const DisplayToDos = document.createElement("div");
    const SearchContainer = document.createElement("div");
    const SearchTask = document.createElement("div");
    const SearchInput = document.createElement("input");
    const SearchIcon = document.createElement("span");
    const Message = document.createElement("p");
    let id = Number(localStorage.getItem("id")) || 0;
    function addToDo() {
        const task = Input.value;
        if (!task) {
            return;
        }
        id = id + 1;
        const obj = {
            id: id,
            text: task,
            complete: false,
            edit: 0
        }
        toDoList.unshift(obj);
        toDoObj[task] = 1;
        console.log(toDoList);
       // console.log(toDoObj);
        Input.value = "";
        Input.focus();
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        localStorage.setItem("id", id);
        renderTask(task);
    }
    function renderTask(task) {
        const ToDoItem = document.createElement("div");
        const DisplayTask = document.createElement("p");
        const DeleteBtn = document.createElement("button");
        const EditBtn = document.createElement("button");
        const CompleteBtn = document.createElement("button");
        const CheckMark = document.createElement("span");
        CompleteBtn.textContent = "\u2713";
        DisplayTask.textContent = task;
        DeleteBtn.textContent = "X";
        EditBtn.textContent = "\u{1F4DD}";
        ToDoItem.append(CompleteBtn, DisplayTask, EditBtn, DeleteBtn);
        DisplayToDos.prepend(ToDoItem);
        DeleteBtn.addEventListener("click", function () { 
            let curr=JSON.parse(localStorage.getItem("toDoList"));
            curr=curr.filter(item=>item.text!=task);
            localStorage.setItem("toDoList",JSON.stringify(curr));
            //const idx = toDoList.indexOf(task);
            //toDoList.splice(idx, 1);
            console.log(toDoList); 
            ToDoItem.remove();
        })

        CompleteBtn.addEventListener("click", function () {
            CompleteBtn.replaceWith(CheckMark);
            CheckMark.textContent = "\u2705";
        })

        EditBtn.addEventListener("click", function () {
            const EditInput = document.createElement("input");
            const SaveBtn = document.createElement("button");
            const SaveNotBtn = document.createElement("button");
            EditInput.value = task;
            SaveBtn.textContent = "\u2713";
            SaveNotBtn.textContent = "X";
            ToDoItem.prepend(EditInput, SaveBtn, SaveNotBtn);
            EditInput.focus();
            EditInput.style.outline = "none";
            CompleteBtn.style.visibility = "hidden";
            CheckMark.style.visibility="hidden";
            DeleteBtn.style.visibility = "hidden";
            EditBtn.style.visibility = "hidden";
            DisplayTask.style.visibility = "hidden";
            EditInput.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    saveTask();
                }
            })
            SaveBtn.addEventListener("click",saveTask);
            SaveNotBtn.addEventListener("click",function(){
                EditInput.remove();
                SaveBtn.remove();
                SaveNotBtn.remove();
                CompleteBtn.style.visibility = "visible";
                DeleteBtn.style.visibility = "visible";
                CheckMark.style.visibility="visible";
                EditBtn.style.visibility = "visible";
                DisplayTask.style.visibility = "visible";
            })
            function saveTask() {
                const UpdatedTask = EditInput.value;
                if (!UpdatedTask) {
                    return;
                }
                console.log(toDoList);
                const index = toDoList.findIndex(item => item.text === task);
                console.log(toDoList);
                if (index !== -1) {
                   toDoList[index] = { id: toDoList[index].id, text: UpdatedTask, complete: false, edit: 0 };
                }
                localStorage.setItem("toDoList",JSON.stringify(toDoList))
                console.log(toDoList);
                DisplayTask.textContent = UpdatedTask;
                //const idx = toDoList.indexOf(task);
                //toDoList[idx] = UpdatedTask;
                EditInput.remove();
                SaveBtn.remove();
                SaveNotBtn.remove();
                CheckMark.style.visibility="visible";
                CompleteBtn.style.visibility = "visible";
                DeleteBtn.style.visibility = "visible";
                EditBtn.style.visibility = "visible";
                DisplayTask.style.visibility = "visible";
            }
            SaveBtn.style.border = "none";
            SaveBtn.style.backgroundColor = "white";

            SaveNotBtn.style.border = "none";
            SaveNotBtn.style.backgroundColor = "white";

            EditInput.style.border = "2px solid white";
            EditInput.style.backgroundColor="#e0e1dd";
            EditInput.style.borderRadius = "3rem";
            EditInput.style.width = "6rem";
            EditInput.style.height = "1.5rem";
        })

        CheckMark.style.fontSize = "1.4rem";
        DisplayTask.style.fontSize = "1.1rem";

        CompleteBtn.style.backgroundColor = "white";
        CompleteBtn.style.border = "none"

        ToDoItem.style.justifyContent = "space-between";
        ToDoItem.style.display = "flex";
        ToDoItem.style.flexDirection="row";
        ToDoItem.style.width="18rem";

        EditBtn.style.backgroundColor = "white";
        EditBtn.style.border = "none";
        EditBtn.style.fontSize = "1.3rem";

        DeleteBtn.style.backgroundColor = "white";
        DeleteBtn.style.border = "none";
        DeleteBtn.style.color = "red";
        DeleteBtn.style.fontSize = "1.4rem";
    }

    AddBtn.addEventListener("click", addToDo);
    Input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addToDo();
        }
    });

    Input.addEventListener("focus", () => {
        Input.style.outline = "none";
    });
    SearchInput.addEventListener("focus", () => {
        SearchInput.style.outline = "none";
    });
    SearchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const task = SearchInput.value;
            const renderedTask = DisplayToDos.children;
            let found = false;
            Array.from(renderedTask).forEach((taskElement) => {
                if (taskElement.textContent==task) {
                    found = true;
                    Message.style.visibility = "hidden";
                    taskElement.style.display = "flex";
                } else {
                    taskElement.style.display = "none";
                }
            })
            if (!found) {
                Message.style.visibility = "visible";
            }
        }
        
        if (SearchInput.value=== "") {
            const renderedTask = DisplayToDos.children;
            Array.from(renderedTask).forEach((taskElement) => {
                Message.style.visibility = "hidden";
                taskElement.style.display = "flex";
            });
        }
    })
    heading.textContent = "To Do Application";
    SearchIcon.textContent = "\uD83D\uDD0D";
    SearchInput.type = "text";
    SearchInput.placeholder = "Search Task ...";
    Message.textContent = "TASK NOT FOUND";
    SearchContainer.append(SearchInput, SearchIcon);
    SearchTask.append(SearchContainer);
    document.body.prepend(SearchTask);
    document.body.prepend(heading);
    AddTask.prepend(Input, AddBtn);
    ToDo.append(AddTask, DisplayToDos, Message);
    Input.type = "text";
    Input.placeholder = "Task..."
    AddBtn.textContent = "ADD";

    //Styling

    const style = document.createElement('style');
    style.textContent = `
        ::-webkit-scrollbar{
        width:1rem;
        height:1rem;
        }
        ::-webkit-scrollbar-track{
          background:grey;
          border-radius:4rem;
        }
        ::webkit-scrollbar-thumb{
         //background:#888;
         }     
    `;
    document.head.appendChild(style);
    DisplayToDos.style.padding = "1rem";
    ToDo.style.margin = "auto";
    ToDo.style.border = "1rem solid white";
    ToDo.style.borderRadius = "1rem";
    ToDo.style.boxShadow = "0 10px 10px rgba(0,0,0,0.5)";
    ToDo.style.backgroundColor = "white";
    ToDo.style.width = "20rem";
    ToDo.style.height = "20rem";
    ToDo.style.marginTop = "1.5rem";
    ToDo.style.overflowY = "auto";
    ToDo.style.padding = "0.5rem";

    SearchContainer.style.position = "relative";
    SearchIcon.style.position = "absolute";
    SearchIcon.style.right = "0.6rem";

    SearchTask.style.display = "flex";
    SearchTask.style.justifyContent = "center";
    SearchTask.style.margin = "8rem auto 0.1rem auto";

    SearchInput.style.width = "20rem";
    SearchInput.style.height = "1.8rem";
    SearchInput.style.borderColor = "white";
    SearchInput.style.borderRadius = "3rem";
    SearchInput.style.boxSizing = "border-box";
    SearchInput.style.boxShadow = "0 10px 20px rgba(0,0,0,0.4)";
    Message.style.visibility = "hidden";

    heading.style.color = "#caf0f8";
    heading.style.textAlign = "center";
    document.body.style.background = "linear-gradient(90deg,#415a77,#0d3b66)";
    Message.style.marginLeft = "5.5rem";
    AddTask.style.display = "flex";
    AddTask.style.position = "relative";

    AddBtn.style.width = "5rem";
    AddBtn.style.fontSize = "0.8rem";
    AddBtn.style.height = "1.7rem";
    AddBtn.style.marginLeft = "0.4rem";
    AddBtn.style.color = "#e0e1dd";
    AddBtn.style.backgroundColor = "#415a77";
    AddBtn.style.border = "2px solid #415a77"
    AddBtn.style.borderRadius = "2rem";
    AddBtn.style.position = "absolute";
    AddBtn.style.right = "1rem"

    Input.style.width = "15rem";
    Input.style.height = "1.4rem";
    Input.style.marginLeft = "2.5rem";
    Input.style.borderRadius = "2rem";
    Input.style.border = "2px solid #e0e1dd";
    Input.style.backgroundColor="#e0e1dd"


    toDoList.forEach(taskObj => {
        console.log(taskObj.text);
        renderTask(taskObj.text);
    });
})();
/*
localStorage.setItem("name","riya");
localStorage.setItem();
const name=localStorage.getItem();
const details={};
localStorage.setItem("a",JSON.stringify(details));
const getObj=JSON.parse(localSTorage.getItem("a"));
*/