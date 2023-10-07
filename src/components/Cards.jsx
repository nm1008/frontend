import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Cards({ id, name, description, price }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body key={id}>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="text-center">{description}</Card.Text>
        <div className="text-center">
        <Card.Text>$ {price}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
