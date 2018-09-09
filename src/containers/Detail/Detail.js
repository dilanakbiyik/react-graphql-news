import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './style.css';

const DEFAULT_IMAGE =
    'https://fashionunited.info/global-assets/img/default/fu-default_1200x630_black-favicon.jpg';

const styles = theme => ({
    dialogGrid: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    imgArea: {
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 180
    },
    appBar: {
        position: 'relative'
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class Detail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {...this.props.location.state};
    }

    handleClose = () => {
        this.props.history.push({
            pathname: '/'
        });
    };

    getBackgroundUrl(url){
        if(url){
            return 'url(' + url + ')';
        }
        return 'url(' + DEFAULT_IMAGE + ')';
    }
    loadDialog(){
        const { classes } = this.props;
        const { selectedItem } = this.state;
        if(this.state.open === true && this.state.selectedItem){
            return (
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Grid className={classes.dialogGrid}>
                        <div className={classes.imgArea} style={{ backgroundImage: this.getBackgroundUrl(selectedItem.imageUrl)}}>
                        </div>
                        <div>
                            <Typography align="center" gutterBottom variant="headline" component="h2">
                                {selectedItem.title}
                            </Typography>
                            <Typography component="p">
                                {selectedItem.description}
                            </Typography>
                        </div>
                    </Grid>
                </Dialog>
            )
        }else{
            return;
        }
    }
    render() {
        return (
            <div className="Detail">
                {this.loadDialog()}
            </div>
        )
    }
}

export default withStyles(styles)(Detail);