import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Cards(name, description) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className='text-center' >
          {description}
        </Card.Text>
        <div className='text-center'>
          <Button variant="primary">Go somewhere</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
