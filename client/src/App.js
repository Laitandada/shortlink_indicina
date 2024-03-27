

import { SnackbarProvider } from "notistack";
import Homepage from './Homepage';

function App() {
  return (
   <>
      <SnackbarProvider maxSnack={3}>

   <Homepage/> 
      </SnackbarProvider>
   
   
   </>
  );
}

export default App;
