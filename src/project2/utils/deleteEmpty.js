function isEmpty(obj) {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
 }
 
 function deleteEmptyString(test, recurse) {
     
     for (var i in test) {
         if (test[i] === '' ) {
             delete test[i];
         } else if (recurse && typeof test[i] === 'object') {
             deleteEmptyString(test[i], recurse);
         }
     }
        
 }
 
 function deleteEmptyObject(test, recurse) {
     
     for (var i in test) {
         if (isEmpty(test[i]) ) {
             delete test[i];
         } else if (recurse && typeof test[i] === 'object') {
             deleteEmptyObject(test[i], recurse);
         }
     }
        
 }
export default deleteEmptyString
// export  deleteEmptyObject
