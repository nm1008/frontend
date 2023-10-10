import { useEffect, useRef } from "react";




const addCourse = () => {
 
    const isAdmin = useRef(localStorage.getItem('isAdmin'))

    useEffect(() => {
        isAdmin.current = isAdmin
    })
  
   
  return (
    <>
     
     {console.log(isAdmin)}

     {isAdmin === 'true' ? (
         <div className="container my-5">
         <h2 className="text-center my-5">Add Course</h2>
         <form action="" >
           <div className="d-flex flex-column align-items-center gap-3">
             <div className="form-group col-md-6">
               <label>Course Name</label>
               <input
                 type="text"
                 className="form-control"
           
               />
             </div>
             <div className="form-group col-md-6">
               <label>Price</label>
               <input
                 type="text"
                 className="form-control"
                
               />
             </div>
             <div className="form-group col-md-6 h">
               <label>Description</label>
               <input
                 type="text"
                 className="form-control input-md"
               
               
               />
             </div>
             <button className="col-md-6 col-sm-5 col-8 btn btn-primary">
               Submit
             </button>
           </div>
         </form>
       </div>
     ) : (
        <h1>Not available</h1>
     )}
       
    </>
  );
};

export default addCourse;
