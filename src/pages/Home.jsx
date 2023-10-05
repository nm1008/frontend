import Cards from "../components/Cards"

export default function Home() {
  return (
    <>
      <div className="text-center m-5 pt-5">
        <h1 className="p-3">Course Booking System</h1>
        <p>Booking for everyone, everywhere</p>
        <button className="bg-primary text-white p-2 rounded border-0">
          <a>Book Now</a>
        </button>
      </div>
      <div className="d-flex gap-5 align=items-center justify-content-center m-5 pt-5">
        <Cards />
        <Cards />
        <Cards />
      </div>
    </>
  );
}
