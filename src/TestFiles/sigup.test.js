import s from "../Components/LoginForm";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignupForm from "../Components/SignupForm"

describe("sigupform form", () => {
  it("renders default signupform", () => {
    render(<SignupForm/>);
    const firstName = screen.getByTestId("firstName");
    const lastName = screen.getByTestId("lastName");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const role = screen.getByTestId("role");
    const subjects = screen.getByTestId("subjects");
    const register = screen.getByTestId("register");
    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(password.value).toBe("");
    expect(role.value).toBe("");
    expect(subjects.value).toBe("");
    expect(register).toHaveClass("Mui-disabled");
  });
  it("renders completed signupform", () => {
    render(<SignupForm/>);
    const firstName = screen.getByTestId("firstName");
    const lastName = screen.getByTestId("lastName");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const role = screen.getByTestId("role");
    const subjects = screen.getByTestId("subjects");
    const register = screen.getByTestId("register");
    fireEvent.change(firstName, { target: { value: "firstName" } });
    fireEvent.change(lastName, { target: { value: "lastName" } });
    fireEvent.change(email, { target: { value: "email" }});
    fireEvent.change(password, { target: { value: "password" }});
    fireEvent.change(role, { target: { value: "role"}});
    fireEvent.change(subjects, { target: { value: "subjects" }});
    expect(register).not.toHaveClass("Mui-disabled");
  });
});
