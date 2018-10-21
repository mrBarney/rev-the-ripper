import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChooseVideo from './ChooseVideo';
import Transcribe from './Transcribe';
import Estimate from './Estimate';
import Finish from './Finish';
import { Modal } from './Modal'
import './App.css'
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


const styles = theme => ({
    appBar: {
        position: 'relative',
        paddingBottom: 30
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
});

const steps = ['Choose audio file', 'Cost Estimation','Transcribe', 'Finish'];
let keepGoing = true;

class App extends React.Component {
    constructor(props){
        super(props);
        this.handleURL = this.handleURL.bind(this);
    }

    state = {
        activeStep: 0,
        videoURL: '',
        isTranscribing: false,
        transcriptionData: [],
        transcriptionId: [],
        show: false,
        dialogOpen: false
    };

    componentDidMount() {
        // const url = "https://support.rev.com/hc/en-us/article_attachments/200043975/FTC_Sample_1_-_Single.mp3";
        // const apiKey = '01cGemVQHqb9wpf1Hq1KP_UDFGbp4MkET0e7uGBqtJ49BoENA-1QWQ4eGggqwI88MPgqoNdbCI-q5iDN5CJ2AiM-o4yI0';


        // fetch(apiURL, {
        //     method: 'GET', // or 'PUT'
        //     //body: JSON.stringify(stuffs), // data can be `string` or {object}!
        // }).then(res => res.json())
        //     .then(response => console.log('Success:', JSON.stringify(response)))
        //     .catch(error => console.error('Error:', error));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeStep !== 2 && this.state.activeStep === 2) {
            this.beginTranscribing();
        }
        if (prevState.isTranscribing && !this.state.isTranscribing) {
            keepGoing = false;
            this.handleNext();
        }
    }

    beginTranscribing() {
        try {
            this.setState({
                isTranscribing: true
            });
            const apiURL = 'https://revripper.azurewebsites.net/api/HttpTrigger1?code=t7QLfsNQkTDjoXtAaK9j2NWxnDx0fmreRwuSkt2XI4m1fkstvI5dzA==&url=' + this.state.videoURL;

            fetch(apiURL, {
                method: 'GET', // or 'PUT'
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log("There was an error oopsie woopsie");
                }
            }).then(response => this.setState({
                transcriptionId: response,
            }));

            console.log(this.state.transcriptionId);

            setInterval(async () => {
                if(keepGoing) {
                    fetch('https://revripper.azurewebsites.net/api/HttpTrigger3?code=GRHoJoTntJRCSvajAlgX1tawrnRT74bSoxys68ox4ytoj5KMCukqCg==&id=' + this.state.transcriptionId.id, {
                        method: 'GET',
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        else {
                            console.log('Not finished transcribing');
                        }
                    }).then(response => {
                        if (response.current_value !== 'in_progress') {
                            this.setState({
                                transcriptionData: response.monologues,
                                isTranscribing: false,
                            });
                        }
                    });
                }
            }, 10000);
        } catch (e) {
            console.log(e);
        }
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return(
                    <ChooseVideo
                        onVideoChange={this.handleURL}
                    />);
            case 1:
                return <Estimate/>;
            case 2:
                return <Transcribe/>;
            case 3:
                return <Finish
                    data={this.state.transcriptionData}
                    url={this.state.videoURL}
                />;
            default:
                throw new Error('Unknown step');
        }
    }

    handleURL(url) {
        this.setState({videoURL: url});
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
        this.handleDialogOpen()
    };
    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    };

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;

        return (
            <StripeProvider apiKey="pk_test_12345">
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Grid
                            justify="space-between" // Add it here :)
                            container
                            spacing={24}
                        >
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    Rev The Ripper
                                </Typography>
                            </Grid>
                            <Grid item>
                                <span>
                                     <Button
                                         variant="contained"
                                         color="primary"
                                         onClick={this.showModal}
                                         className={classes.button}
                                     >
                                        {'Add Card'}
                                    </Button>
                                </span>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Transcribe Audio File
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={this.handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                            disabled={this.state.isTranscribing}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <Elements>
                        <InjectedCheckoutForm closeModal={this.hideModal}/>
                    </Elements>
                </Modal>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Card Added</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Your card was successfully added
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
            </StripeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);