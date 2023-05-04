import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle login logic here
    if (email === 'example@gmail.com' && password === 'password') {
      // successful login
      console.log('Logged in successfully!');
      this.props.navigation.navigate("/")

    } else {
      // unsuccessful login
      setShowAlert(true);
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit} style={{padding: '1rem', margin: '2rem'}} >
        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Incorrect email or password. Please try again.
          </Alert>
        )}
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop: '1rem'}}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
