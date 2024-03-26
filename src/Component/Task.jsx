import React, { useState, useEffect } from "react";
import Moment from "moment";
import { BASE_URL, MAX_DESCRIPTION_LENGTH } from "../constants";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [slug, setSlug] = useState(null);
  const navigate = useNavigate();
  // Status value will be always To Do for POST Operation and it will be disabled on
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "",
  });
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const changeFormValues = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      if (slug) {
        const response = await fetch(BASE_URL + "tasks/" + slug, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer "+localStorage.getItem("access-token"),
          }
        });

        if (!response.ok) {
          throw new Error("Failed to update task");
        }
      } else {
        // Add new task
        const response = await fetch(BASE_URL + "tasks", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to add task");
        }
      }
      fetchTasks();

      setSlug(null);
      setFormData({
        title: "",
        description: "",
        due_date: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding or updating task:", error);
    }
  };

  const updateValue = async (slug) => {
    try {
      const response = await fetch(BASE_URL + "tasks/" + slug,{
        method:"PUT",
        headers: {
          Authorization: "Bearer "+localStorage.getItem("access-token"),
        },
      });
      const task = await response.json();
      setSlug(slug);
      setFormData({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: task.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (slug) => {
    try {
      await fetch(BASE_URL + "tasks/" + slug, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer "+localStorage.getItem("access-token"),
        },
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const truncateDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
    }
    return description;
  };

  useEffect(() => {
    const authenticated = !!localStorage.getItem("access-token");
    console.log("authenticated" + authenticated);
    if (authenticated) {
      fetchTasks();
    } else {
      navigate("/");
    }
  }, []);

  const fetchTasks = async () => {
    console.log('calling fetch tasks')
      console.log(localStorage.getItem("access-token"))

    try {
      console.log(localStorage.getItem("access-token"))
      const response = await fetch(BASE_URL + "tasks", {
        method: "GET",
        headers: {
          Authorization: "Bearer "+localStorage.getItem("access-token"),
        },
      });
      if(!response.ok){
        console.log(response)
        navigate("/");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = (task) => {
    setSelectedTask(task);
    document.getElementById("descriptionModal").style.display = "block";
  };

  return (
    <div className="row m-3">
      <div className="col shadow p-3 m-2 bg-white rounded">
        <h4>TASKS</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>
                  {truncateDescription(task.description)}
                  {task.description.length > MAX_DESCRIPTION_LENGTH && (
                    <span
                      className="text-primary pe-auto"
                      onClick={() => handleShowModal(task)}
                      style={{
                        marginLeft: "5px",
                        textDecoration: "underline",
                      }}
                    >
                      Read more
                    </span>
                  )}
                </td>
                <td>{Moment(task.due_date).format("DD-MM-YYYY")}</td>
                <td>{task.status}</td>
                <td>
                  <i
                    className="fas fa-pencil-alt m-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => updateValue(task.slug)}
                  ></i>

                  <i
                    className="fas fa-trash-alt m-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteTask(task.slug)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-5 shadow p-3 m-2 bg-white rounded">
        <form onSubmit={createTask}>
          <div className="form-group mt-1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={changeFormValues}
            />
          </div>
          <div className="form-group mt-1">
            <label htmlFor="due_date">Due Date</label>
            <input
              type="Date"
              className="form-control"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={changeFormValues}
            />
          </div>
          <div className="form-group mt-1">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={changeFormValues}
            >
              <option value="" disabled>
                Select Current Status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="form-group mt-1">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={changeFormValues}
            />
          </div>
          <div className="form-group mt-4 text-right">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: "40px" }}
            >
              {slug ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      <div id="descriptionModal" className="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="m-2">{selectedTask?.title}</h2>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="text-justify">{selectedTask?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
