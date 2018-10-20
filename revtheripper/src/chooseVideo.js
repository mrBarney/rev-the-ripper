import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function chooseVideo() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Choose video
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="button-file">
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default chooseVideo;