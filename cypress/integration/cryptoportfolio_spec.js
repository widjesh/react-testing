const myPortfolio = {
  btc: "0.00414918",
  eth: "0.4",
  doge: "11638"
};

describe("Crypto Overview", () => {
  it("User can calculate worth of their coins", () => {
    // Navigate to our home page
    cy.visit("http://localhost:3000/");

    // Fetch Rates
    cy.wait(2000);
    cy.get("#fetch-rates").click();

    // Fill in their amount of coins they have
    cy.wait(2000);
    cy.get("#bitcoin").type(myPortfolio.btc);
    cy.get("#etherium").type(myPortfolio.eth);
    cy.get("#dogecoin").type(myPortfolio.doge);

    // Calculate the total worth
    cy.wait(2000);
    cy.get("#calculate").click();

    //Verify if the total worth is correct
    cy.get("#bitCoinValue").then(bitcoinValue => {
      cy.get("#etheriumValue").then(etheriumValue => {
        cy.get("#dogeCoinValue").then(dogeValue => {
          let total = 0;
          total +=
            parseStringToFloat(bitcoinValue) * myPortfolio.btc +
            parseStringToFloat(etheriumValue) * myPortfolio.eth +
            parseStringToFloat(dogeValue) * myPortfolio.doge;
          cy.get("[data-test=totalWorth]").then(value => {
              console.log('>>>',parseStringToFloat(value))
            expect(total.toFixed(2)).to.equal(parseStringToFloat(value).toFixed(2));
          });
        });
      });
    });
  });
});

const parseStringToFloat = rate => {
  return parseFloat(rate.text().replace("$", ""));
};
