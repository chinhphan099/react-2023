import PropTypes from 'prop-types'

export default function Input(props) {
  return (
    <fieldset>
      <legend>{props.title}</legend>
      <input type="tel" value={props.value} onChange={(event) => {props.handleChange(event.target.value)}} />
    </fieldset>
  )
}


Input.propTypes = {
  title: PropTypes.string,
  temperature: PropTypes.string,
  onTemperatureChange: PropTypes.func
}

