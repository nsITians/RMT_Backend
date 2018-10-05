# Backend for the rate.nsut.me project

## Database Setup

```sql
create role rmt LOGIN PASSWORD 'rmtPass';
create database rmtdb;
\c rmtdb;
grant all privileges on database "rmtdb" to rmt with grant option;
```

## Current API Structure

```js
/* Teacher */
{
	name: <String>(NOT NULL),
	designation: <String>,
	description: <String>,
	piture: <URL>
}
/*
/api/v1/teachers
- / - GET : All teachers
- /:id - GET : Teacher with id
- /:id - PUT : Edit the details of a teacher
- /:id - DELET : Delete a teacher
- /new - POST : Create a new teacher
- /?queryParam=query - GET : Filter results
*/
```

```js
/* Course */
{
	name: <String>(NOT NULL),
	code: <String>(NOT NULL),
	description: <String>
}
/*
/api/v1/courses
- / - GET : All courses
- /:id - GET : Course with id
- /:id - PUT : Edit the details of a course
- /:id - DELETE : Delete a course
- /new - POST : Create a new course
- /?queryParam=query - GET : Filter results
*/
```

```js
/* Post */
{
	content: <String>(NOT NULL),
	rating: <Integer>(0-5),
	year: <Integer>,
	teacherId: <Foreign_Key>(NOT NULL),
	courseId: <Foreign_Key>(NOT NULL)
}
/*
/api/v1/teachers
- / - GET : All teachers
- /:id - GET : Teacher with id
- /:id - PUT : Edit the details of a teacher
- /:id - DELETE : Delete a teacher
- /new - POST : Create a new teacher
- /?queryParam=query - GET : Filter results
*/
```

## Examples
POST to `http://localhost:4000/api/v1/posts/new`

```js
	 request_body: 
	 {
        "content": "This is a very basic post",
        "rating": 5,
        "year": 2017,
        "teacherId": 1,
        "courseId": 1
    }
    response:
     {
        "id": 1,
        "content": "This is a very basic post",
        "rating": 5,
        "course": "ITC15",
        "year": 2017,
        "createdAt": "2018-09-30T15:12:26.227Z",
        "updatedAt": "2018-09-30T15:12:58.561Z",
        "teacherId": 1,
        "courseId": 1
    }
```