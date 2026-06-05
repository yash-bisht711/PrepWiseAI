const InterviewHistory =
({ results }) => {

 return (

 <div>

 <h2>
 Previous Interviews
 </h2>

 {
 results.map(
 result => (

 <div
 key={result._id}
 className="
 border
 p-4
 my-3
 rounded
 "
 >

 <h3>
 Score:
 {
 result.overallScore
 }
 </h3>

 <p>
 {
 result.feedback
 }
 </p>

 </div>

 ))
 }

 </div>

 );

};

export default InterviewHistory;