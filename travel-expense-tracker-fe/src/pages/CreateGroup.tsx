import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { useAuth } from "../context/auth.context";
import { createGroup } from "../apis/apis";
import { currencies } from "../utils/constant";
import { uuid } from "../utils/utils";
import "./styles/createGroup.css";

export interface GroupPayload {
  name: string;
  members: string[];
  description: string;
  currency: string;
  category: string;
}

interface InputValueType {
  email: string;
  id: string;
}
const CreateGroup: React.FC = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [groupDescription, setGroupDescription] = useState<string>("");
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [currency, setCurrency] = useState<string>(currencies[0]);
  const [category, setCategory] = useState<string>("");
  const { user } = useAuth();
  const [membersInputs, setMembersInputs] = useState<InputValueType[]>([
    { email: user?.email!, id: uuid(8) },
  ]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const memberEmails = [...new Set([...groupMembers, user?.email!])]; //remove duplicate email

    try {
      const groupPayload = {
        name: groupName,
        members: memberEmails,
        description: groupDescription,
        currency,
        category,
      };

      await createGroup(groupPayload);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error creating group:", error.response?.data);
      } else {
        console.error("Unexpected error creating group:", error.message);
      }
    }
  };

  const handleGroupMembersChange = (value: string, id: string) => {
    //inputs: [{email:"asdasd",id:1},{email:"x@x.com",id:3}]
    const inputs = [...membersInputs];
    inputs.forEach((input) => {
      if (input.id == id) {
        input.email = value;
      }
    });
    setMembersInputs(inputs);
    const membersList = inputs.map((input) => input.email); //convert to ["x@x.com","y@y.com"]
    setGroupMembers(membersList);
  };

  const handlePlus = () => {
    setMembersInputs((prev) => [...prev, { email: "", id: uuid(8) }]);
  };

  const handleDelete = (id: string) => {
    if (membersInputs.length <= 1) return;
    const newInputs = membersInputs.filter((input) => input.id !== id);
    setMembersInputs(newInputs);
  };

  return (
    <>
      <h2>Create New Group</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Group Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "100px" }}
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Label>Group Members </Form.Label>
          </Col>
          <Col className="create-group-plus">
            <div onClick={handlePlus}>
              <img src="/icons/plus.svg" />
            </div>
          </Col>
        </Row>
        {membersInputs.map((input) => (
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter member's email"
                aria-label="Enter member's email"
                aria-describedby="member-email"
                type="text"
                value={input.email}
                onChange={(e) =>
                  handleGroupMembersChange(e.target.value, input.id)
                }
              />
              <Button
                onClick={() => handleDelete(input.id)}
                variant="outline-secondary"
                id="button-addon2"
              >
                <img src="/icons/trash-fill.svg" />
              </Button>
            </InputGroup>
          </Form.Group>
        ))}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Currency</Form.Label>
            <Form.Select
              value={currency}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setCurrency(e.target.value)
              }
            >
              <option disabled>Choose value</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Create Group
        </Button>
      </Form>
    </>
  );
};

export default CreateGroup;
