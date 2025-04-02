// dummy view, that returns text and a component state based counter.
export function TestAllCoursesView(props) {

  return (
    <div>
      {props.courses.map(mapCourse)}
    </div>
  )
}

function mapCourse(course){
  return(
    <div>
      <h3>{course.code}</h3>
      <h3>{course.name}</h3>
      <p>{course.location}</p>
      <p>{course.description}</p>
    </div>
  )
}