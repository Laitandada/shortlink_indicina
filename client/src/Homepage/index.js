import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  TextField,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { Container, OverallContainer } from "./styled";
const Homepage = () => {
    const [tabValue, setTabValue] = useState(0);
    const [encodedUrl, setEncodedUrl] = useState('');
    const [encodedUrlResult, setEncodedUrlResult] = useState('');
    const [decodedUrlResult, setDecodedUrlResult] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [password, setPassword] = useState('');
    const [showExpirationDate, setShowExpirationDate] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [decodedUrl, setDecodedUrl] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [allUrls, setAllUrls] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    
    useEffect(() => {
      
      fetchAllUrls();
    }, []);
  
    const fetchAllUrls = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/allUrls`);
        const data = await response.json();
        if (data.allEncodedUrls) {
          setAllUrls(data.allEncodedUrls);
        }
      } catch (error) {
        enqueueSnackbar(`Error fetching all URLs`, {
            variant: "error",
          });
        console.error('Error fetching all URLs:', error);
      }
    };
  
    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };
  
    const handleEncodeSubmit = async (event) => {
      event.preventDefault();
   
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/encode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            decodedUrl: encodedUrl,
            expirationMinutes: showExpirationDate ? expirationDate : undefined,
            password: showPassword ? password : undefined,
          }),
        });
       
        const data = await response.json();
        enqueueSnackbar(`${data.message}`, {
            variant: "success",
          });
          setEncodedUrlResult(data?.encodedUrl.encodedUrl)
          setEncodedUrl("")
          setExpirationDate("")
          setPassword("")
        console.log(data);
      } catch (error) {
        enqueueSnackbar(`Error encoding URL:`, {
            variant: "error",
          });
        console.error('Error encoding URL:', error);
      }
    };
  
    const handleDecodeSubmit = async (event) => {
        event.preventDefault();
     
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/decode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            encodedUrl: decodedUrl,
            password: password,
          }),
        });
   
        const data = await response.json();
        setDecodedUrlResult(data?.decodedUrl)
        enqueueSnackbar(`${data.message}`, {
            variant: "success",
          });
        if (data.message === 'Password is required for decoding this URL') {
          setShowPasswordInput(true);
        }
      } catch (error) {
        console.error('Error decoding URL:', error);
      }
    };
  
    const handleRowClick = (url) => {
      setSelectedUrl(url);
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setSelectedUrl(null);
      setDialogOpen(false);
    };
  
    // const handleGoToUrl = async () => {
    //   if (selectedUrl) {
 
    //     try {
    //       const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/encodedUrl/${selectedUrl.encodedUrl}`);
   
    //       console.log(response);
    //     } catch (error) {
    //       console.error('Error fetching URL:', error);
    //     }
    //   }
    // };

    const handleCopyUrl = () => {
        if (selectedUrl) {
          navigator.clipboard.writeText(`${process.env.REACT_APP_SERVER_URL}/api/encodedUrl/${selectedUrl.encodedUrl}`);
        }
        enqueueSnackbar(`Url copied to clipboard`, {
            variant: "success",
          });
      };
  
    return (
      <OverallContainer>
        <Container>
         <Typography variant="h4" sx={{pt:5}}>
                   ShortLink

                    </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Encode Url" />
          <Tab label="Decode Url" />
        </Tabs>
        {tabValue === 0 && (
          <form onSubmit={handleEncodeSubmit}>
            <TextField
              label="URL to Encode"
              value={encodedUrl}
              onChange={(event) => setEncodedUrl(event.target.value)}
              fullWidth
              required
              sx={{mb:1}}
            />
            <FormControlLabel
              control={<Checkbox checked={showExpirationDate} onChange={(event) => setShowExpirationDate(event.target.checked)} />}
              label="Expiration Time"
            />
            {showExpirationDate && (
              <TextField
                label="Expiration Time in Minutes"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={expirationDate}
                onChange={(event) => setExpirationDate(event.target.value)}
                fullWidth
                sx={{mt:1, mb:2}}
              />
            )}
            <FormControlLabel
              control={<Checkbox checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />}
              label="Password"
            />
            {showPassword && (
              <TextField
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                required
                sx={{mt:1, mb:3}}
              />
            )}
            <Button type="submit" variant="contained" color="primary">
              Encode URL
            </Button>
          </form>
        )}
        {tabValue === 1 && (
          <form onSubmit={handleDecodeSubmit}>
            <TextField
              label="Encoded URL"
              value={decodedUrl}
              onChange={(event) => setDecodedUrl(event.target.value)}
              fullWidth
              required
            />
            {showPasswordInput && (
              <TextField
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                required
              />
            )}
            <Button type="submit" variant="contained" color="primary">
              Decode URL
            </Button>
          </form>
        )}
        

                <Box>
                    <Typography variant="h5" sx={{textAlign:"center"}}>
                    {encodedUrlResult && tabValue === 0 ? `${process.env.REACT_APP_SERVER_URL}/${encodedUrlResult}` : null}
                    {decodedUrlResult && tabValue === 1 ? decodedUrlResult : null}

                    </Typography>
                </Box>



        <TableContainer component={Paper} sx={{mt:3}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Encoded URL</TableCell>
                <TableCell>Stats</TableCell>
           
              </TableRow>
            </TableHead>
            <TableBody>
              {allUrls.map((url) => (
                <TableRow key={url._id} onClick={() => handleRowClick(url)} sx={{cursor:"pointer"}}>
                  <TableCell>{url.decodedUrl}</TableCell>
                  <TableCell>{url.encodedUrl}</TableCell>
                  <TableCell>{url.stats}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>URL Details</DialogTitle>
          <DialogContent>
            {selectedUrl && (
              <div>
                <Typography>Encoded URL:  {selectedUrl.encodedUrl}</Typography>
                <Typography>Original URL:  {selectedUrl.decodedUrl}</Typography>
                <Typography>Stats: {selectedUrl.stats}</Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCopyUrl} color="primary">
           Copy
            </Button>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        </Container>
      </OverallContainer>
    );
  };
export default Homepage;
