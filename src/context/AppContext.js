import React, { createContext, useState, useContext, useEffect } from "react";
import endpoints from "../config/endpoints";
import uuid from 'react-uuid';
export const AppContext = createContext();

export function useTask() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
  const [taskStatusList, setTaskStatusList] = useState({});
  const [viewItems, setViewItems] = useState([]);
  const [taskId, setTaskId] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch(endpoints['get-all-tasks']);
      if (!response.ok){
        throw new Error('Failed to fetch data');
      }
      const tasks = await response.json()
      console.log(tasks);
      setViewItems(tasks);
    }
    fetchData();
  },[])

  useEffect(()=>{
    const fetchStatusData = async () => {
      const response = await fetch(endpoints['get-tags']);
      if (!response.ok){
        throw new Error('Failed to fetch data');
      }
      const states = await response.json()
      setTaskStatusList(states);
    }
    fetchStatusData();
  },[])


  const addTask = (title, viewId) => {
    // do api call to add task to backend
    const newTask = {
      id: uuid(),
      title,
      scheduleDate: "",
      description: "",
      
    };
    let apiData = {
      id: newTask.id,
      title: newTask.title,
      scheduleDate: newTask.scheduleDate,
      status: taskStatusList[viewId],
      description: newTask.description
    };
    const newViewItems = viewItems.map((view) =>
      view.id === viewId ? { ...view, tasks: [...view.tasks, newTask] } : view
    );
    fetch(endpoints["add-task"], {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain',
          'Accept': '*/*'
      },
      body: JSON.stringify(apiData)
  })
  console.log(JSON.stringify(apiData))
    setViewItems(newViewItems);
  };

  const addView = (name) => {
    const newView = {
      name,
      id: Math.floor(Math.random() * 10000),
      color: "bg-orange-300/20",
      tasks: [],
    };
    setViewItems([...viewItems, newView]);
  };

  const deleteTask = (taskId, viewId) => {
    // call api to backend to delete task in backend
    let apiData = {
      id: taskId
    };
    const newViewItems = viewItems.map((view) =>
      view.id === viewId
        ? {
            ...view,
            tasks: view.tasks.filter((task) => task.id !== taskId),
          }
        : view
    );
    fetch(endpoints["delete-task"], {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain',
          'Accept': '*/*'
      },
      body: JSON.stringify(apiData)
    });
    setViewItems(newViewItems);
  };

  const updateTask = (taskId, viewId, title, description, scheduleDate) => {
    // call api to backend to update the task in backend
    let apiData = {
      id: taskId,
      title: title,
      scheduleDate: scheduleDate,
      status: taskStatusList[viewId],
      description: description
    };
    const newViewItems = viewItems.map((view) =>
      view.id === viewId
        ? {
            ...view,
            tasks: view.tasks.map((task) =>
              task.id === taskId ? { ...task, title, description } : { ...task }
            ),
          }
        : view
    );
    fetch(endpoints["update-task"], {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain',
          'Accept': '*/*'
      },
      body: JSON.stringify(apiData)
    });
    setViewItems(newViewItems);
  };

  const changeView = (currentTask, fromViewId, toViewId) => {
    // console.log({ currentTask, fromViewId, toViewId });
    const currentTaskId = currentTask.id;
    const newTask = {
      id: uuid(),
      title: currentTask.title,
      scheduleDate: "",
      status: taskStatusList[toViewId],
      description: currentTask.description,
    };
    let apiData = {
      id: newTask.id,
      title: newTask.title,
      scheduleDate: newTask.scheduleDate,
      status: taskStatusList[toViewId],
      description: newTask.description
    };
    const newViewItems = viewItems.map((view) =>
      view.id === toViewId
        ? { ...view, tasks: [...view.tasks, newTask] }
        : view
    );
    fetch(endpoints["add-task"], {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain',
          'Accept': '*/*'
      },
      body: JSON.stringify(apiData)
  })
    setViewItems(newViewItems);
    // remove task from previous view
    // call api to delete that currentTaskId
    const newViewItems2 = newViewItems.map((view) =>
      view.id === fromViewId
        ? {
            ...view,
            tasks: view.tasks.filter((task) => task.id !== currentTask.id),
          }
        : view
    );
    apiData = {
      id: currentTaskId
    };
    fetch(endpoints["delete-task"], {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain',
          'Accept': '*/*'
      },
      body: JSON.stringify(apiData)
    });
    setViewItems(newViewItems2);
    // deleteTask(currentTask.id, fromViewId);
  };

  const value = {
    viewItems,
    addTask,
    addView,
    setTaskId,
    taskId,
    deleteTask,
    updateTask,
    changeView,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
