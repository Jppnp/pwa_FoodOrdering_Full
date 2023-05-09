import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const { firstName, lastName, phone, email, department } = employee;

  return (
    <Col md={6} lg={4} xl={3}>
      <Card style={{ marginBottom: "1rem" }}>
        <Card.Body>
          <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
          <Card.Text>
            <strong>Phone:</strong> {phone}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {email}
          </Card.Text>
          <Card.Text>
            <strong>Department:</strong> {department}
          </Card.Text>
          <Button variant="primary" onClick={() => onEdit(employee)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={() => onDelete(employee)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const EmployeeList = () => {
  const employees = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      department: "Marketing",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phone: "987-654-3210",
      email: "janesmith@example.com",
      department: "Sales",
    },
    // Add more employee objects as needed
  ];

  const handleEdit = (employee) => {
    // Handle edit action
    console.log("Edit", employee);
  };

  const handleDelete = (employee) => {
    // Handle delete action
    console.log("Delete", employee);
  };

  return (
    <Row>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </Row>
  );
};

export default EmployeeList;
