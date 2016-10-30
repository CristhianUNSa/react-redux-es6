import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({field, value, label, error, type, onChange}) => {
  return(
    <div className={classnames("form-group", { 'has-error' : error})}>
      <label className="control-label">{label}</label>
      <input 
        type={type} 
        name={field} 
        className="form-control"
        value={value}
        onChange={onChange} 
        />
        {error && <span className="help-block">{error}</span>}
    </div>
  )
}
TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: 'text'
};
export default TextFieldGroup;