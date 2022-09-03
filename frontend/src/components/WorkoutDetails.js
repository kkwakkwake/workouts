import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const resposne = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const data = await resposne.json()

    if (resposne.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data })
    }
  }


  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load(kg): </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;