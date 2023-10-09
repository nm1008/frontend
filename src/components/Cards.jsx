import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const isAdmin = localStorage.getItem("isAdmin")

export default function Cards({ id, name, description, price }) {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body key={id}>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="text-center">{description}</Card.Text>
        <Card.Text className="text-center">$ {price}</Card.Text>
        <div className="text-center">
          {isAdmin ? (
            <div className="d-flex gap-2 justify-content-center">
               <button className="btn btn-primary">Edit Course</button>
               <button className="btn btn-danger">Delete Course</button>
            </div>
          ):( 
            <Button className="btn btn-primary">Enroll</Button>
            )}
        </div>
      </Card.Body>
         
        
    </Card>
  );
}
