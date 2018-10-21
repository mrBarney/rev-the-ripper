import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Estimate extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                       <h2> Estimate Cost : ${(Math.random()*3.3).toPrecision(3)}</h2>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Estimate;