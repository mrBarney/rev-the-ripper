import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

class Transcribe extends React.Component {
    state = {
        completed: 0,
        buffer: 10,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        if (completed > 100) {
            this.setState({ completed: 0, buffer: 10 });
        } else {
            const diff = Math.random() * 0.8;
            const diff2 = Math.random() * 0.8;
            this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
        }
    };

    render() {
        const { completed, buffer } = this.state;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
                        <br />
                        <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Transcribe;