import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Cards() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title className="text-center">Card Title</Card.Title>
        <Card.Text className='text-center' >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
          earum consequatur fuga aliquam deserunt quasi facere cupiditate
          tempora id asperiores?
        </Card.Text>
        <div className='text-center'>
          <Button variant="primary">Go somewhere</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
