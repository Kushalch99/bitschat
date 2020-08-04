import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import logo from '../images/logo.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
//redux
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
//MUI imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
    ...theme.globalStyle
})

class login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors)
        this.setState({
            errors:nextProps.ui.errors
        })
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        const userData = {
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginUser(userData,this.props.history)           
    }
    handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {
        const { classes , ui:{ loading }} = this.props
        const { errors } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={logo} alt="bitschat_logo" className={classes.image}/>
                    <Typography variant="h4" className={classes.pageTitle}>LOGIN</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email"
                         name="email"
                         type="email"
                         label="Email" 
                         className={classes.textField}
                         helperText={errors.email} 
                         error={errors.email ? true : false} 
                         value={this.state.email} 
                         onChange={this.handleChange} fullWidth/>

                        <TextField id="password"
                         name="password" 
                         type="password" 
                         label="Password" 
                         className={classes.textField}
                         helperText={errors.password} 
                         error={errors.password ? true : false}  
                         value={this.state.password} 
                         onChange={this.handleChange} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit"
                         variant="contained" 
                         color="primary" 
                         className={classes.button}
                         disabled={loading}>
                            LOGIN
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>don't have an accout? Sign up <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes:PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    ui:PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    user:state.user,
    ui:state.ui
})
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login))
