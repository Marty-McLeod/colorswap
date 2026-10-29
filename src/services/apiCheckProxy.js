
/* Used to verify the API backend can be reached by the application
    using the poxy during development
*/
export async function apiCheckProxy() {
/*  Verifies the application can reach the API by proxy,
    returning the test data (simple test message) received or
    error in case of a failure
*/
 try{
      fetch('/api/message')
          .then(res => res.json())
          return res;
  } catch(err) {
        return err.message;
  }  
};