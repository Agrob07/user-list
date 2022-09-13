import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Formik } from "formik";
import * as yup from "yup";

import { addUser, editUser } from "../features/counter/usersSlice";

let schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "username is too short - should be 3 chars minimum.")
    .max(20, "username is too long")
    .required("No username provided."),
  age: yup.number().positive().required("No age provided."),
  city: yup
    .string()
    .min(3, "username is too short - should be 3 chars minimum.")
    .max(20, "username is too long")
    .required("No city provided."),
  email: yup.string().email().required("No email provided."),
  option : yup.string()
  .required()
  .oneOf(["QA", "Developer"])
  .label("Wrong option"),

});

export default function Modal({ show, setShow, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initValues = {
    username: "",
    age: 0,
    city: "",
    email: "",
  };

  return (
    <div className="py-64">
      
      <div className="py-12">
        <div
          className="w-full flex items-center w-full justify-center"
          id="button"
        >
          {pathname === "/" && (
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
              onClick={() => setShow(true)}
            >
              Create user
            </button>
          )}
        </div>
        <div
          className={`${
            show ? "flex" : "hidden"
          } h-full w-full absolute items-center justify-center top-0 lg:mx-auto md:px-28 md:py-10 px-4 py-9`}
          id="modal"
        >
          <div
            className="bg-black bg-opacity-70 w-full h-full absolute"
            onClick={() => setShow(false)}
          />
          <div className="bg-white border border-gray-300 xl:w-2/6 w-full relative z-30 xl:px-14 lg:px-28 md:px-16 px-4 py-10 flex flex-col items-center justify-center">
            <Formik
              initialValues={user ? user : initValues}
              validationSchema={schema}
              onSubmit={(values) => {
                console.log(values,152);
                user
                  ? dispatch(
                      editUser({
                        id: user.id,
                        ...values,
                      })
                    )
                  : dispatch(
                      addUser({
                        id: uuidv4(),
                        ...values,
                      })
                    );
                setTimeout(() => {
                  setShow(false);
                  navigate("/users");
                }, 1000);
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className="w-full mt-8">
                   
                    <select name="option" id="dropdown" value={props.values.option}
                      onChange={props.handleChange}
                    className="w-full py-4 focus:outline-none 
                    text-base leading-4 text-gray-600 border-gray-500 border-2">Test
                     <option  value="default">Please choose a category</option>
                        <option value="QA">QA</option>
                        <option value="Developer">Developer</option>   
                    </select>
                    {props.errors.option &&  (
                      <p  className="bg-red-500">Wrong option</p>
                    )}
                    
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
                      name="age"
                      onChange={props.handleChange}
                      value={props.values.age}
                      aria-label="enter age adress"
                      type="number"
                      placeholder="Age"
                      className="w-full py-4 focus:outline-none text-base leading-4 text-gray-600 border-gray-400 border-b"
                    />
                    {props.errors.age && props.touched.username && (
                      <p className="bg-red-500">Wrong age</p>
                    )}
                    <input
                      name="city"
                      onChange={props.handleChange}
                      value={props.values.city}
                      aria-label="enter city adress"
                      type="text"
                      placeholder="City"
                      className="w-full py-4 focus:outline-none text-base leading-4 text-gray-600 border-gray-400 border-b"
                    />
                    {props.errors.city && props.touched.username && (
                      <p className="bg-red-500">Wrong city</p>
                    )}  
                    <input
                      name="email"
                      onChange={props.handleChange}
                      value={props.values.email}
                      aria-label="enter email adress"
                      type="email"
                      placeholder="Email address"
                      className="w-full py-4 focus:outline-none text-base leading-4 text-gray-600 border-gray-400 border-b"
                    />
                    {props.errors.email && props.touched.username && (
                      <p className="bg-red-500">wrong email</p>
                    )}
                    <button
                      type="submit"
                      aria-label="unlock ten percent off"
                      className="text-base font-medium leading-4 py-4 w-full bg-gray-800 text-white uppercase mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:bg-gray-700"
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
    </div>
  );
}
