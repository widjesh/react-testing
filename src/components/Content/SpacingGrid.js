import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import bitcoin from "../../images/bitcoin.png";
import dogecoin from "../../images/dogecoin.png";
import etherium from "../../images/etherium.png";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 180,
    width: 100
  },
  control: {
    padding: theme.spacing(2),
    justifyContent: "center"
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    height: 140,
    width: 100
  },
  button: {
    marginTop: "2rem"
  }
}));

export default function SpacingGrid() {
  const [bitCoinValue, setBitCoinValue] = useState(0);
  const [etheriumValue, setEtheriumValue] = useState(0);
  const [dogeCoinValue, setDogeCoinValue] = useState(0);

  const [btc, setBtc] = useState("");
  const [eth, setEth] = useState("");
  const [doge, setDoge] = useState("");

  const [total, setTotal] = useState(btc + eth + doge);

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  useEffect(async () => {
    setTotal(0);
  }, []);

  const calculate = () => {
    const totalWorth = Number(
      btc * bitCoinValue + eth * etheriumValue + doge * dogeCoinValue
    );
    setTotal(totalWorth.toFixed(2));
  };

  const getRatesOfMyCryptos = async () => {
    const bitCoinData = await axios.get(
      "https://api.coinbase.com/v2/exchange-rates?currency=BTC"
    );
    setBitCoinValue(bitCoinData.data.data.rates.USD);
    const etheriumData = await axios.get(
      "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
    );
    setEtheriumValue(etheriumData.data.data.rates.USD);
    const dogeCoinData = await axios.get(
      "https://api.coinbase.com/v2/exchange-rates?currency=DOGE"
    );
    setDogeCoinValue(dogeCoinData.data.data.rates.USD);
  };

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid key={1} item>
              <Paper className={classes.paper}>
                <div>
                  <Typography variant="h6" component="h6">
                    Bitcoin
                  </Typography>
                </div>
                <img src={bitcoin} width="70" height="80"></img>
                <div>
                  <Fab
                    variant="extended"
                    color="primary"
                    size="small"
                    data-testid="bitCoinValue"
                    id="bitCoinValue"
                  >
                    $ {bitCoinValue}
                  </Fab>
                  <div>
                    <TextField
                      id="bitcoin"
                      onChange={e => setBtc(e.target.value)}
                    />
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid key={2} item>
              <Paper className={classes.paper}>
                <div>
                  <Typography variant="h6" component="h6">
                    Etherium
                  </Typography>
                </div>
                <img src={etherium} width="70" height="80"></img>
                <div>
                  <Fab
                    variant="extended"
                    color="primary"
                    size="small"
                    data-testid="etheriumValue"
                    id="etheriumValue"
                  >
                    $ {etheriumValue}
                  </Fab>
                </div>
                <div>
                  <TextField
                    id="etherium"
                    onChange={e => setEth(e.target.value)}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid key={3} item>
              <Paper className={classes.paper}>
                <div>
                  <Typography variant="h6" component="h6">
                    Dogecoin
                  </Typography>
                </div>
                <img src={dogecoin} width="100" height="80"></img>
                <div>
                  <Fab
                    variant="extended"
                    color="primary"
                    size="small"
                    data-testid="dogeCoinValue"
                    id="dogeCoinValue"
                  >
                    $ {dogeCoinValue}
                  </Fab>
                </div>
                <div>
                  <TextField
                    id="dogecoin"
                    onChange={e => setDoge(e.target.value)}
                  />
                </div>
              </Paper>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              id="fetch-rates"
              data-testid="fetch-button"
              onClick={async () => await getRatesOfMyCryptos()}
            >
              Fetch Rates
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.button}>
        <div>
          <Button
            variant="contained"
            id="calculate"
            color="primary"
            onClick={calculate}
          >
            Calculate My Worth
          </Button>
        </div>
        <div className={classes.button}>
          <Fab
            data-test="totalWorth"
            variant="extended"
            color="primary"
            size="small"
          >
            $ {total}
          </Fab>
        </div>
      </div>
    </>
  );
}
