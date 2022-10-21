import Login from "../Components/LoginForm";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("Login form", () => {
  const initialState = {
    currentUser: null,
    isFetching: false,
    error: false,
    success: false,
    staff: {
      error: false,
    },
  };
  const mockStore = configureStore();
  let store;
  it("renders default state", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
    );

    const email = screen.getByTestId("emailInput");
    const password = screen.getByTestId("passwordInput");
    const login = screen.getByTestId("login");
    expect(email.value).toBe("");
    expect(password.value).toBe("");
    expect(login).toHaveClass("Mui-disabled");
  });

  // After Enter Values
  it("After entering the values", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
    );

    const email = screen.getByTestId("emailInput");
    const password = screen.getByTestId("passwordInput");
    const login = screen.getByTestId("login");
    fireEvent.change(email, { target: { value: "email" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.click(login);

    expect(login).not.toHaveClass("Mui-disabled");
  });
});


