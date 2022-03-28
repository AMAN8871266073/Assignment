# Assignment
Mentor-Student managment system
1. Create a database with table 1: Mentor details
With columns: mentor id, mentor name, mentor location
2. Create a table 2 : Student Details
With columns: student id, student name,student location, mentor id
3. Write a REST API to connect with db and query the data from the tables.
4. The query should fetch the data from the Mentors and Students table. The output should
be in the nested JSON format, as shown below:
Result: [ {

mentorId:
mentorName:
mentorLocation:
Students: [ {
studentId:
studentName:
studentLocation:
} ]

} ]

Basically the output should be List of mentors and their corresponding student list.

Task 2:
In addition to the above task,
Add an option for search: API should accept the search parameter and fetch the data which
matches the value given in the search parameter.

For eg:
API : /&lt;apiName&gt;
Request Payload: { searchParameter: “John” }
Response: [ {

mentorId:
mentorName:
mentorLocation:

Students: [ {
studentId:
studentName:
studentLocation:
} ]

} ]

Case 1: If the search parameter matches the mentor data then the result should be a list of
mentors.

Case 2: If the search parameter matches the student data then the result should be a list of
matched student data along with their mentors as the nested JSON array shown above.

Case 3: If search parameter matches both, the student as well as mentor data then the result
should be a list of matched mentor &amp; student data in the nested JSON array shown above.


when we are searching document 4 cases we have

case1:when no specific query is passsed in request.(neither on mentor nor on student document (mentor controller from line no:60)

case 2:when query is passed in request on both mentor and student document(mentorController from line no :111)

case 3:when query is passed in request on mentor document only(mentorController:from line no:124)

case4:when query is passed in request on student document only(mentorController from line no:132)

Note:all the queries are coming in request through query paarameters
there are 7 individual queries and there permutations and combinations possible

search by mentorName

search by mentorLocation

search by mentorId

search by studentId

search by studentName

search by studentLocation

search by smentorId
