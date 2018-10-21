import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

class Estimate extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>

                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                       <h2> Estimate Cost : $0.55</h2>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Estimate;