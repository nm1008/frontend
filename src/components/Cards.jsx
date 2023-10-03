import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function Cards() {
  return (
    <Card style={{ width: '18rem' }} >
      <Card.Body>
        <Card.Title className='text-center'>Card Title</Card.Title>
        <Card.Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam earum consequatur fuga aliquam deserunt quasi facere cupiditate tempora id asperiores?
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
