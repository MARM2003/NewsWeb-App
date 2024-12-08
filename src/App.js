import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Badge, Form, Button,Nav,Link   } from 'react-bootstrap';

function App() {
  const [mydata, setData] = useState([]);
  const [category, setCategory] = useState("all");

  const apiget = (event) => {
    event.preventDefault();
    const word = event.target.elements.word.value || "all";

    fetch(`https://inshortsapi.vercel.app/news?category=${word}`).then((res) => {
      return res.json();
    }).then((value) => {
      setData(value.data);
      setCategory(word);
      console.log(value.data);
    });
  };

  useEffect(() => {
    const fetchInitialData = () => {
      fetch(`https://inshortsapi.vercel.app/news?category=${category}`).then((res) => {
        return res.json();
      }).then((value) => {
        setData(value.data);
        setCategory(value.category);
        console.log(value.category);
        console.log(value.data);
      });
    };

    fetchInitialData();
    const interval = setInterval(fetchInitialData, 30000);
    return () => clearInterval(interval);
  }, [category]);

  return (
    <>
      <Form onSubmit={apiget} className="p-3">
        <Form.Group controlId="formKeyword">
          <Form.Label>
            Key words to be searched: [all, national //Indian National News, business, sports, world, politics, technology, startup, entertainment, miscellaneous, hatke // Unconventional, science, automobile]
          </Form.Label>
          <Form.Control
            type="text"
            name="word"
            placeholder="Enter category"
            className="my-3"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <Container fluid>
        <Row xs={1} md={3} className="g-4 mt-4 h-sm-50 h-md-75 h-lg-100">
          {
            mydata.map((news, i) => {
              return (
                <Col key={i}>
                  <Card>
                    <Card.Header><Badge bg="success">{category}</Badge></Card.Header>
                    <Card.Img variant="top" src={news.imageUrl} />
                    <Card.Body>
                      <Card.Title>{news.title}</Card.Title>
                      <Card.Text>
                        {news.content}
                      </Card.Text>
                      <Nav.Link href={news.readMoreUrl} target="_blank" className="text-primary">
                        Read More
                      </Nav.Link>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">Author: {news.author}</small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">{news.date} {news.time}</small>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
      </Container>
    </>
  );
}

export default App;
