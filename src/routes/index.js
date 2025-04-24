
import courseRoutes from "./courseRoutes.js"


const mountRoutes  = (app)=>{
    app.use("/api/v1/courses", courseRoutes);

  };
  
  export default mountRoutes ;