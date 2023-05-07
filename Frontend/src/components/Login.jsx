import { useState } from "react";
import { userLogin } from "../utils/UserLogin";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Here, you would define the logic for checking the user's credentials and setting their role
    // For example:
    if (username === "admin" && password === "admin") {
      userLogin("admin");
      navigate("/");
    } else if (username === "client" && password === "client") {
      userLogin("client");
      navigate("/client");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div class="container-fluid">
        <div class="row mh-100vh">
          <div
            class="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0"
            id="login-block"
          >
            <div class="m-auto w-lg-75 w-xl-50">
              <h2 class="text-info font-weight-light mb-5">
                <i class="fa fa-diamond"></i>&nbsp;Your company
              </h2>
              <form>
                <div class="form-group">
                  <label class="text-secondary">Username</label>
                  <input
                    class="form-control"
                    type="text"
                    required=""
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$"
                    inputmode="text"
                    onChange={setUsername}
                  />
                </div>
                <div class="form-group">
                  <label class="text-secondary">Password</label>
                  <input
                    class="form-control"
                    type="password"
                    required=""
                    onChange={setPassword}
                  />
                </div>
                <button
                  class="btn btn-info mt-2"
                  type="submit"
                  onClick={handleLogin}
                >
                  Log In
                </button>
              </form>
              <p class="mt-3 mb-0">
                <a class="text-info small" href="/">
                  Forgot your email or password?
                </a>
              </p>
            </div>
          </div>
          <div
            class="col-lg-6 d-flex align-items-end"
            id="bg-block"
            style={{
              backgroundImage: require("../assets/bg.jpg"),
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <p class="ml-auto small text-dark mb-2">
              <em>Photo by&nbsp;</em>
              <a
                class="text-dark"
                href="https://unsplash.com/photos/v0zVmWULYTg?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
              >
                <em>Aldain Austria</em>
              </a>
              <br />
            </p>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Invalid username or password. Please try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <script src={require("../assets/js/jquery.min.js")} />
    </div>
  );
}

export default Login;
