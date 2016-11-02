import React from 'react';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import isEmpty from 'lodash/isEmpty';

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
      isLoading: false,
      invalid: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }
  checkAllErrorsEmpty(obj){
    return Object.keys(obj).every((key)=>{
      return !obj[key];
    });
  }
  checkUserExists(e){
    const field = e.target.name;
    const val = e.target.value;
    if( val !== ''){
      this.props.isUserExists(val).then(res=>{
        let errors = this.state.errors;
        let invalid = true;
        console.log(res.data.user, errors)
        if(res.data.user){
          errors[field] = 'There is user with such '+ field;
          invalid = true;
        }
        else{
          errors[field] = '';
          if(this.checkAllErrorsEmpty(errors)){
            invalid = false;
          }
        }
        this.setState({ errors, invalid });
      });
    }
  }
  isValid(){
    const { errors, isValid } = validateInput(this.state);
    
    if(!isValid){
      this.setState({ errors : errors});
    }

    return isValid;
  }
  onSubmit(e){
    e.preventDefault();
    if(this.isValid()){
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
        .then(
          () => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Se ha registrado con éxito. Bienvenido!'
            });
            this.context.router.push('/'); //redirect  
          }
        )
        .catch(
          ( { data }) => this.setState({errors: data, isLoading: false})
        );
    }
  }
  render(){
    const { errors, isLoading, invalid } = this.state;
    const options = Object.keys(timezones).map(function(key){
      return (
        <option key={timezones[key]} value={timezones[key]}>{key}</option>
      )
    })
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Únete a nuestra comunidad !</h1>
        <TextFieldGroup
          error={errors.username}
          label="Nombre de Usuario"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username" 
        />
        <TextFieldGroup
          error={errors.email}
          label="E-mail"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email" 
          type="email"
        />
        <TextFieldGroup
          error={errors.password}
          label="Password"
          type="password"
          onChange={this.onChange}
          value={this.state.password}
          field="password" 
        />
        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Confirm password"
          type="password"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation" 
        />
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
          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading || invalid}>Registrarse</button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router : React.PropTypes.object.isRequired
}

export default SignupForm;