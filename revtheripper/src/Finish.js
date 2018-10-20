import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Finish() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Finished!
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Finish;