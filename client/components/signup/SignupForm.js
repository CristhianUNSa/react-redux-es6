import React from 'react';
import timezones from '../../data/timezones';
import classnames from 'classnames';

class SignupForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.userSignupRequest(this.state)
      .then(
        () => { this.setState({isLoading: false}); }
      )
      .catch(
        ( {data }) => this.setState({errors: data, isLoading: false})
      );
  }
  render(){
    const { errors, isLoading } = this.state;
    const options = Object.keys(timezones).map(function(key){
      return (
        <option key={timezones[key]} value={timezones[key]}>{key}</option>
      )
    })
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Únete a nuestra comunidad !</h1>
        <div className={classnames("form-group", { 'has-error' : errors.username})}>
          <label className="control-label"> Nombre de Usuario</label>
          <input 
            type="text" 
            name="username" 
            className="form-control"
            value={this.state.username}
            onChange={this.onChange} 
            />
            {errors.username && <span className="help-block">{errors.username}</span>}
        </div>
        <div className={classnames("form-group", { 'has-error' : errors.email})}>
          <label className="control-label"> E-mail</label>
          <input 
            type="text" 
            name="email" 
            className="form-control"
            value={this.state.email}
            onChange={this.onChange} 
            />
            {errors.email && <span className="help-block">{errors.email}</span>}
        </div>
        <div className={classnames("form-group", { 'has-error' : errors.password})}>
          <label className="control-label"> Password</label>
          <input 
            type="text" 
            name="password" 
            className="form-control"
            value={this.state.password}
            onChange={this.onChange} 
            />
            {errors.password && <span className="help-block">{errors.password}</span>}
        </div>
        <div className={classnames("form-group", { 'has-error' : errors.passwordConfirmation})}>
          <label className="control-label"> Confirmar</label>
          <input 
            type="text" 
            name="passwordConfirmation" 
            className="form-control"
            value={this.state.passwordConfirmation}
            onChange={this.onChange} 
            />
            {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
        </div>
        <div className={classnames("form-group", { 'has-error' : errors.timezone})}>
          <label className="control-label"> Timezone</label>
          <select 
            type="text" 
            name="timezone" 
            className="form-control"
            value={this.state.timezone}
            onChange={this.onChange} 
          >
            <option value="" disabled>Elige tu timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>Registrarse</button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;