import React from 'react';
import timezones from '../../data/timezones';

class SignupForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  render(){
    const options = Object.keys(timezones).map(function(key){
      return (
        <option key={timezones[key]} value={timezones[key]}>{key}</option>
      )
    })
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Únete a nuestra comunidad !</h1>
        <div className="form-group">
          <label className="control-label"> Nombre de Usuario</label>
          <input 
            type="text" 
            name="username" 
            className="form-control"
            value={this.state.username}
            onChange={this.onChange} 
            />
        </div>
        <div className="form-group">
          <label className="control-label"> E-mail</label>
          <input 
            type="text" 
            name="email" 
            className="form-control"
            value={this.state.email}
            onChange={this.onChange} 
            />
        </div>
        <div className="form-group">
          <label className="control-label"> Password</label>
          <input 
            type="text" 
            name="password" 
            className="form-control"
            value={this.state.password}
            onChange={this.onChange} 
            />
        </div>
        <div className="form-group">
          <label className="control-label"> Confirmar</label>
          <input 
            type="text" 
            name="passwordConfirmation" 
            className="form-control"
            value={this.state.passwordConfirmation}
            onChange={this.onChange} 
            />
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg">Registrarse</button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;