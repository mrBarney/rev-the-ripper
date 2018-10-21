import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Finish extends React.Component {
    constructor(props){
        super(props);

        this.data = this.props.data;
    }


    render(){
        const data = this.props.data;

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    {data}
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Finish;