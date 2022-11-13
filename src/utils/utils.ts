export const removeNullableKeys = <T = {}>(obj: T) => {

   Object.keys(obj).forEach(key => {
      if (obj[key] === null) {
         delete obj[key];
      }
   });
   
   return obj;
};