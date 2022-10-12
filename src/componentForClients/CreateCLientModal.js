import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { sagaActions } from "../app/sagaActions";

const CreateCLientModal = ({ control, showForm, setShowForm }) => {
  const dispatch = useDispatch();
  const initValues = {
    username: "",
    name: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    control.option === "edit"
      ? dispatch({
          type: sagaActions.EDIT_USER_REQUESTED,
          values,
          id: control.id,
        })
      : dispatch({ type: sagaActions.CREATE_USER_REQUESTED, values });
  };

  return (
    <div className="py-64">
      <div
        className={`${
          showForm ? "flex" : "hidden"
        } h-full w-full absolute items-center justify-center top-0 lg:mx-auto md:px-28 md:py-10 px-4 py-9`}
        id="modal"
      >
        <div
          className="bg-black bg-opacity-70 w-full h-full absolute"
          onClick={() => setShowForm(false)}
        />

        <div className="bg-white border border-gray-300 xl:w-2/6 w-full relative z-30 xl:px-14 lg:px-28 md:px-16 px-4 py-10 flex flex-col items-center justify-center">
          <Formik initialValues={initValues} onSubmit={handleSubmit}>
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="w-full mt-8">
                  <input
                    name="username"
                    onChange={props.handleChange}
                    value={props.values.username}
                    aria-label="enter username adress"
                    type="text"
                    placeholder="Username"
                    className="w-full py-4 focus:outline-none text-base leading-4 text-gray-600 border-gray-400 border-b"
                  />
                  {props.errors.username && props.touched.username && (
                    <p className="bg-red-500">Wrong username</p>
                  )}
                  <input
                    name="name"
                    onChange={props.handleChange}
                    value={props.values.name}
                    aria-label="enter name"
                    type="text"
                    placeholder="Name"
                    className="w-full py-4 focus:outline-none text-base leading-4 text-gray-600 border-gray-400 border-b"
                  />
                  {props.errors.age && props.touched.username && (
                    <p className="bg-red-500">Wrong age</p>
                  )}
                  <input
                    name="password"
                    onChange={props.handleChange}
                    value={props.values.city}
                    aria-label="enter password"
                    type="text"
                    placeholder="password"
                    className="w-full py-4 focus:outline-none text-base leading-4 text-gray-600 border-gray-400 border-b"
                  />
                  {props.errors.city && props.touched.username && (
                    <p className="bg-red-500">Wrong city</p>
                  )}

                  <button
                    type="submit"
                    aria-label="unlock ten percent off"
                    className="text-base font-medium leading-4 py-4 w-full bg-gray-800 text-white uppercase mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:bg-gray-700"
                    onClick={() => {
                      setShowForm(false);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateCLientModal;
