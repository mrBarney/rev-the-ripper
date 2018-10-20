import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

function Transcribe() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                <CircularProgress/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Transcribe;