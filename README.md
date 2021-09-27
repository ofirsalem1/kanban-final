# Task Manager App - KANBAN


### User instructions

1. When you click on one of the add-task buttons, a new task will be added to the respective list. The task content will be taken from the respective input field.
2. Trying to submit empty tasks should cause an alert.
3. Double clicking a task element will enable you to edit your text. When the task element loses focus the change will be saved.
4. Hovering over a task element and pressing `alt + 1-3` will move the task to the appropriate list (`1`: todo, `2`: in-progress, `3`: done).
5. The search input  filter tasks case-**in**sensitively, so that only tasks that match the search string are displayed. The filter will be reapplied every time that you change the content of the search input (on **every keystroke**).
6. You can drag and drop tasks between different lists

7. In the save and load buttons you can save your tasks in the API and so you can use your tasks through different devices
8. The clear button can delete all the tasks that are currently on the page and also the tasks that are stored for you in local storage. When you click the clear button you will be asked where you want to delete the tasks from

### Storage

- The data of all the tasks saved to `localStorage` following any changes made to the data. The data saved under a storage key named `tasks`.(use the data saved in the local storage to keep the data on the page after refresh)


