import renderer from 'react-test-renderer';
import ManageStaff from "../Pages/ManageStaff";
import ManageStudents from "./Pages/ManageStudents";
import ManageAttendence from "./Pages/ManageAttendence";
import ManageMarks from "./Pages/ManageMarks";
import ManageClass from "./Pages/ManageClass";
import MarkAttendence from "./Pages/MarkAttendence";
import EnterMarks from "./Pages/EnterMarks";
import React from 'react';

describe("Frontend Snapshot", () => {
it('renders Managing staff Ui', () => {
  const tree = renderer.create(<ManageStaff/>).toJSON();
  expect(tree).toMatchSnapshot();
})
it('renders Managing students Ui', () => {
  const tree = renderer.create(<ManageStudents/>).toJSON();
  expect(tree).toMatchSnapshot();
})
it('renders Managing Attendence Ui', () => {
  const tree = renderer.create(<ManageAttendence/>).toJSON();
  expect(tree).toMatchSnapshot();
})
it('renders Managing marks Ui', () => {
  const tree = renderer.create(<ManageMarks/>).toJSON();
  expect(tree).toMatchSnapshot();
})
it('renders Managing class Ui', () => {
  const tree = renderer.create(<ManageClass/>).toJSON();
  expect(tree).toMatchSnapshot();
})
it('renders Mark Attendence Ui', () => {
  const tree = renderer.create(< MarkAttendence/>).toJSON();
  expect(tree).toMatchSnapshot();
})
it('renders the enter marks Ui', () => {
  const tree = renderer.create(<EnterMarks/>).toJSON();
  expect(tree).toMatchSnapshot();
})
})