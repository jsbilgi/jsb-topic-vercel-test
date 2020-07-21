import {useState, Fragment} from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import { PlusSquare, Copy } from "react-feather";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

function AddLinks(props) {

    const { fullScreen } = props;
    const [ modalOpen, setModalOpen ] = useState(false)

    const [aLink, setALink] = useState('')

    const setActiveUrl = function(e){
        setALink(e.target.value)
    }

    const addLinkHandler = async function(){
        console.log(props.baseUrl, props.token)

		var data = {
		    "url": aLink
		}

		var xhttp = new XMLHttpRequest();

		xhttp.open("POST", props.baseUrl + "api/entries?access_token="+props.token, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		await xhttp.send("url="+aLink); 
		

		 setTimeout(() => { 
            setModalOpen(false)
		 }, 3000);

    }

    return (
        <Fragment>
            <Tooltip title="Add leaf" aria-label="Add leaf">
                <IconButton color="inherit" onClick={()=> setModalOpen(true)}>
                    <PlusSquare size={18} />
                </IconButton>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={modalOpen}
                onClose={()=> setModalOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Do you have any resources to share?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can add Articles, Books, Videos, Tutorials, Tools, Podcast too. Whatever you wanna share with the others.
                    <Paper elevation={1} className="add-link-input" style={{display: 'flex', margin: '16px 0px'}}>
                        <InputBase  placeholder="Paste a valid link" value={aLink} onChange={setActiveUrl.bind()} style={{flexBasis: '90%', fontSize: '0.9rem', padding: '5px 10px'}}/>
                        <Divider />
                        <IconButton color="primary" aria-label="Directions" onClick={addLinkHandler}>
                            <PlusSquare stroke="rgba(0, 0, 0, 0.87)" size={16}/>
                        </IconButton>
                    </Paper>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setModalOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <style jsx>
                {`
                    .add-link-input {
                        display: flex;
                        grid-template-columns: auto 10px 40px;
                    }
                `}
            </style>
        </Fragment>
    )
}

AddLinks.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(AddLinks);