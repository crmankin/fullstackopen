import { connect } from 'react-redux'
import { setFilter } from '../store/filterStore'

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
