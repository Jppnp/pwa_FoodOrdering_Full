import { Button, Card, Col, Row } from "react-bootstrap";
// import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { TiSpanner } from "react-icons/ti";
import { Link } from "react-router-dom";

// const client = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
// });

function ShowUsers() {
  const [datas, setData] = useState([]);
  const [mode, setMode] = useState("online");

  // useEffect(() => {
  //   client
  //     .get("users")
  //     .then((respone) => {
  //       console.log(respone);
  //       setData(respone.data);
  //       localStorage.setItem("users", JSON.stringify(respone));
  //     })
  //     .catch((err) => {
  //       setMode('offline');
  //       let collection = localStorage.getItem("users");
  //       console.log("Already get item in localStorage")
  //       setData(JSON.parse(collection));
  //     });
  // }, []);

  useEffect(() => {
    let url = process.env.REACT_APP_BASE_URL;
    fetch(url + `/users`)
      .then((response) => {
        response.json().then((result) => {
          console.warn(result);
          setData(result);
          localStorage.setItem("users", JSON.stringify(result));
        });
      })
      .catch((err) => {
        setMode("offline");
        let collection = localStorage.getItem("users");
        setData(JSON.parse(collection));
      });
  }, []);

  // function DeleteUser(event) {
  //   var fid = event.target.id;
  //   try {
  //     client.delete("/" + fid).then(window.location.reload());
  //   } catch (err) {
  //     console.error(`Delete`, err);
  //   }
  // }
  return (
    <div>
      <div>
        {mode === "offline" ? (
          <div class="alert alert-warning" role="alert">
            {" "}
            you are in offline mode
          </div>
        ) : null}
      </div>
      <h2>All Users !!! </h2>
      <Row xs={1} md={2} className="g-4" style={{ margin: "1rem" }}>
        {datas.map((data) => {
          return (
            <div key={data.id}>
              <Col>
                <Card>
                  <Card.Body>
                    <p>Username: {data.username}</p>
                    <p>Name: {data.name}</p>
                    <p>Email: {data.email}</p>
                    <p>phone: {data.phone}</p>
                    <Link to={`/update`} state={{ id: data.id }}>
                      <Button className="btn btn-warning">
                        <TiSpanner />
                      </Button>
                    </Link>
                    {/* <Button
                      id={data.id}
                      onClick={DeleteUser}
                      className="btn btn-danger"
                    >
                      <TiDelete />
                    </Button> */}
                  </Card.Body>
                </Card>
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
}
export default ShowUsers;
