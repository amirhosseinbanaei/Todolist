const addInputTodo = document.querySelector('.addInputTodo');
const addNewTodoBtn = document.querySelector('.addNewTodoBtn');
const allTodoesContainer = document.querySelector('.allTodoesContainer');
const sortContainer = document.querySelector('.sortContainer');
const sortOption = document.querySelector('.sortOption');

function filterTodo(entry) {
   console.log(entry);
   if (entry == 'Uncompleted') {
      const getUncompletedTodo = allTodoes.filter(function (todoObj) {
         return todoObj.isCompleted === false;
      })
      todoesStructure(getUncompletedTodo)
   } else if (entry == 'Completed') {
      const getUncompletedTodo = allTodoes.filter(function (todoObj) {
         return todoObj.isCompleted === true;
      })
      todoesStructure(getUncompletedTodo)
   } else {
      todoesStructure(allTodoes)
   }
}

sortContainer.addEventListener('click', function () {
   if (sortOption.classList.contains('hidden')) {
      sortOption.classList.remove('hidden')
   } else {
      sortOption.classList.add('hidden')
   }
   const allSortOptionContaienr = [...sortOption.firstElementChild.children];
   allSortOptionContaienr.forEach(function (eachOption) {
      eachOption.addEventListener('click', function (e) {
         const optionTitle = e.currentTarget.firstElementChild;
         const optionIcon = e.currentTarget.firstElementChild.nextElementSibling;
         sortContainer.firstElementChild.innerHTML = optionTitle.innerHTML;
         sortContainer.children[1].className = optionIcon.className;
         const sortOptionArr = [optionTitle.innerHTML, optionIcon.className];
         localStorage.setItem('sort-todoes', JSON.stringify(sortOptionArr));
         filterTodo(optionTitle.innerHTML)
         sortOption.classList.add('hidden')
      })
   })
})

let allTodoes = []

function addTodo() {
   const todoTitle = addInputTodo.value

   const newObj = {
      id: allTodoes.length + 1,
      title: todoTitle,
      isCompleted: false
   }

   allTodoes.push(newObj);
   todoesStructure(allTodoes);
   addToStorage(allTodoes);
   sortContainer.firstElementChild.innerHTML = 'All tasks';
   sortContainer.children[1].className = "uil uil-sort-amount-down text-gray/8 text-xl";
   const sortOptionArr = [sortContainer.firstElementChild.innerHTML, sortContainer.children[1].className];
   localStorage.setItem('sort-todoes', JSON.stringify(sortOptionArr));
   addInputTodo.value = ''
}

function todoesStructure(todoesArray) {
   allTodoesContainer.innerHTML = ''
   const todoFragment = document.createDocumentFragment();
   todoesArray.forEach(eachTodo => {
      const newTodoContainer = document.createElement('div');
      newTodoContainer.className = "w-full h-14 border-2 border-gray/8 rounded-2xl flex";

      const todoTitleSpaceContainer = document.createElement('div');
      todoTitleSpaceContainer.className = "w-5 h-full rounded-l-2xl";

      const todoTitle = document.createElement('input');
      todoTitle.className = "h-full w-full input font-bold text-gray/8 font-semibold align-middle focus:outline-0 focus:border-0";
      todoTitle.setAttribute('readonly', '')
      todoTitle.setAttribute('maxlength', '32')
      todoTitle.value = eachTodo.title;

      const iconsContainer = document.createElement('span');
      iconsContainer.className = "w-32 h-full flex rounded-r-2xl items-center justify-center gap-x-2 xl:gap-x-4";

      const completeBtn = document.createElement('i');
      completeBtn.className = 'uil uil-check-circle text-green-400 text-xl';

      const unCompleteBtn = document.createElement('i');
      unCompleteBtn.className = 'uil hidden uil-times-circle text-gray/6 text-xl';

      const editBtn = document.createElement('i');
      editBtn.className = "uil uil-edit text-gray/8 text-xl";

      const deleteBtn = document.createElement('i');
      deleteBtn.className = "uil uil-trash-alt text-red-400 text-xl";

      const acceptEditedBtn = document.createElement('i');
      acceptEditedBtn.className = "uil uil-message text-gray/8 text-xl hidden";

      iconsContainer.append(completeBtn, unCompleteBtn, editBtn, deleteBtn, acceptEditedBtn);

      newTodoContainer.append(todoTitleSpaceContainer, todoTitle, iconsContainer);

      const hiddenIcon = [];
      const allIcons = [...iconsContainer.children];
      editBtn.addEventListener('click', function () {
         todoTitle.removeAttribute('readonly');
         todoTitle.focus()
         allIcons.forEach(function (eachIcon) {
            if (!eachIcon.classList.contains('hidden')) {
               hiddenIcon.push(eachIcon);
               console.log(hiddenIcon);
               eachIcon.classList.add('hidden');
            }
         })
         acceptEditedBtn.classList.remove('hidden');
      })

      acceptEditedBtn.addEventListener('click', function () {
         todoTitle.setAttribute('readonly', '');
         todoTitle.blur()
         hiddenIcon.forEach(function (eachHiddenIcon) {
            eachHiddenIcon.classList.remove('hidden');
         })
         acceptEditedBtn.classList.add('hidden');
         eachTodo.title = todoTitle.value;
         addToStorage(todoesArray);
      })


      completeBtn.addEventListener('click', function () {
         completeBtn.classList.add('hidden');
         unCompleteBtn.classList.remove('hidden');
         newTodoContainer.style.opacity = '0.5';
         eachTodo.isCompleted = true;
         addToStorage(todoesArray);
      })

      unCompleteBtn.addEventListener('click', function () {
         unCompleteBtn.classList.add('hidden');
         completeBtn.classList.remove('hidden');
         newTodoContainer.style.opacity = '1';
         eachTodo.isCompleted = false;
         addToStorage(todoesArray);
      });

      deleteBtn.addEventListener('click', function (e) {
         let localStorageTodos = JSON.parse(localStorage.getItem("todoes"))
         allTodoes == localStorageTodos
         const findObjIndex = allTodoes.findIndex(function (allTodoes) {
            return allTodoes.title == e.target.parentElement.previousElementSibling.value;
         })
         allTodoes.splice(findObjIndex, 1);
         addToStorage(allTodoes);
         todoesStructure(allTodoes);
      })

      if (eachTodo.isCompleted) {
         completeBtn.classList.add('hidden');
         unCompleteBtn.classList.remove('hidden');
         newTodoContainer.style.opacity = '0.6';
      } else {
         unCompleteBtn.classList.add('hidden');
         completeBtn.classList.remove('hidden');
      }

      todoFragment.append(newTodoContainer);
   });
   allTodoesContainer.append(todoFragment);
}

function addToStorage(todoesArray) {
   localStorage.setItem('todoes', JSON.stringify(todoesArray));
}

addNewTodoBtn.addEventListener('click', function () {
   addTodo();
});

addInputTodo.addEventListener('focus', function () {
   window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && addInputTodo.value !== '') {
         addTodo();
      }
   })
})
window.addEventListener('load', function () {
   let localStorageTodos = JSON.parse(localStorage.getItem("todoes"))
   if (localStorageTodos) {
      allTodoes = localStorageTodos;
   } else {
      allTodoes = []
   }
   const localStorageSortOption = JSON.parse(localStorage.getItem('sort-todoes'));
   if (localStorageSortOption) {
      sortContainer.firstElementChild.innerHTML = localStorageSortOption[0];
      sortContainer.children[1].className = localStorageSortOption[1];
      filterTodo(localStorageSortOption[0])
   }
   // todoesStructure(allTodoes)
})