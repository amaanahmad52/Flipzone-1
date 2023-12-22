// class apifeature{
//     constructor(Query,queryString){  //ex-> query is like mongo.find and querystr is the keywords in api url
//         this.Query=Query,
//         this.queryString=queryString
//     }

//     search(){
//          ///req.query.keyword in api call is used to get  keywords, its a method req.query (here this.querysting is query.req, as given by product controller)

//         const keyword=this.queryString.keyword
//             ?{
//                 name: {
//                   $regex: this.queryStr.keyword, //to match pattern, no need to give exact name
//                   $options: "i", //case insensitive
//                 },
//               }
//             : {};
      
//           this.Query = this.Query.find({ ...keyword });//here spread operatopr will provide keyword value, otherwise if not used then we get reference of keyword only
//           return this.exec()  //will return  mongodb object  , cause this,Query is product.find
                    
//     }

//     // filter(){
//     //   //
//     // }

// }

class apifeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;  //it will receive an objext
  }
  
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //regular expression is a method in mongodb to search like google, no need to give complete string exact same
            $options: "i",  //case insensititve
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });  //got actual cpy of keyword not reference,, as we have used spread operator
    return this;
    
  }

  filter(){
    //we will create copy of querystring , so that koi dikkat na ho
    let copystr={...this.queryStr}  //ie req.query
    
    const removeditems=["keyword","page","limit"]
   
    //now remove these items from actual req.query 
    removeditems.forEach((hataao)=>{delete copystr[hataao]})
   
    //filter for price and ratings
    // this.query=this.query.find(copystr)

    let queryStr = JSON.stringify(copystr);
   
    // console.log(queryStr)  //withpit dollar sign
     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);  //turnig it to mongodb defined objects, uske aage dollar hota
  
     //use of regular expression    (kis kis ko replace krna hai, kisse krna h  , outer dollar is of string , inner is of mongo db object)
    this.query = this.query.find(JSON.parse(queryStr));  //now iss dollar lagi hue ke saath mongo db pe search krege, wrna nhi hota search
    // console.log(queryStr)  uncomment it to see how its adding dollar sign
    return this;

  }

  // filter() {
  //   const queryCopy = { ...this.queryStr };
  //   //   Removing some fields for category
  //   const removeFields = ["keyword", "page", "limit"];

  //   removeFields.forEach((key) => delete queryCopy[key]);

  //   // Filter For Price and Rating

  //   let queryStr = JSON.stringify(queryCopy);
  //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

  //   this.query = this.query.find(JSON.parse(queryStr));

  //   return this;
  // }

  pagination(kitnaperpage){

    const currentpage=Number(this.queryStr.page) ||1 //if page not given then consider page as 1

    const shuruwaat_ke_skip=kitnaperpage*(currentpage-1) 
    //rest will be shown 
    this.query=this.query.limit(kitnaperpage).skip(shuruwaat_ke_skip)  //finding with limit and skip , these are funcs of mongodb see docs
    return this
  }
}


module.exports=apifeature