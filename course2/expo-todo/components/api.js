const crudfulOptions = {
  headers: {
    cfAccessKey: "75ca4ddbde8291858f35dfc4b8b75f7b45e40700",
    "Content-Type": "application/json",
  },
};

export const getTasks = (setData, setIsLoading, raiseError) => {
  return fetch("https://todo.crudful.com/tasks", crudfulOptions)
    .then((response) => {
      setTimeout(() => setIsLoading(false), 1000);
      if (response.status === 200) {
        return response.json();
      } else {
        console.error("Bad response status: ", response.status);
        raiseError("Bad request");
      }
    })
    .then((serverData) => setData(serverData.results));
};

export const createTask = (title, raiseError) => {
  return fetch("https://todo.crudful.com/tasks", {
    method: "POST",
    body: JSON.stringify({ title: title }),
    ...crudfulOptions,
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.error(response.status);
      raiseError("Error");
    }
  });
};

export const setIsCompleted = (taskId, newIsCompleted) => {
  return fetch(`https://todo.crudful.com/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ isCompleted: newIsCompleted }),
    ...crudfulOptions,
  });
};

export const deleteTask = (taskId) => {
  return fetch(`https://todo.crudful.com/tasks/${taskId}`, {
    method: "DELETE",
    ...crudfulOptions,
  });
};
