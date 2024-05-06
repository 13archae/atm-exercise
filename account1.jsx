// this keeps a running total of deposits and withdrawal
const CryptoValue = ({ bitcoin, ethereum }) => {
  console.log(`in CryptoValue`);

  return (
    <>
      <div className="container pb-5px text-primary">Bitcoin: {bitcoin}</div>
      <div className="container pb-5px text-danger">Etheriun: {ethereum}</div>
    </>
  );
};

// this keeps a running total of deposits and withdrawal
const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  if (atmMode === "") {
    return <div></div>;
  } else {
    return (
      <div className="row">
        <label className="label huge">
          <h3> {choice[Number(!isDeposit)]}</h3>
          <div className="col-6">
            <input
              id="number-input"
              type="number"
              width="200"
              onChange={onChange}
            ></input>
          </div>
          <input
            type="submit"
            width="200"
            value="Submit"
            id="submit-input"
            disabled={!isValid}
          ></input>
        </label>
      </div>
    );
  }
};

const Account = () => {
  const [accountState, setAccountState] = React.useState(0);
  const [deposit, setDeposit] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [bitcoin, setBitcoin] = React.useState(0);
  const [ethereum, setEthereum] = React.useState(0);
  console.log(`isDeposit in account: ${isDeposit}`);

  const handleChange = (event) => {
    const targetValue = event.target.value;
    console.log(`handleChange ${targetValue}`);

    if (targetValue <= 0) {
      setValidTransaction(false);
    } else if (atmMode === "Cash Back" && targetValue > accountState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }

    setDeposit(Number(targetValue));
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? accountState + deposit : accountState - deposit;
    //alert(`Account total = ${newTotal}`);
    setAccountState(newTotal);
    setBitcoin(newTotal * 0.000017);
    setEthereum(newTotal * 0.00032);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    const selectvalue = event.target.value;
    setAtmMode(selectvalue);
    if (selectvalue === "Deposit") {
      setIsDeposit(true);
    } else if (selectvalue === "Cash Back") {
      setIsDeposit(false);
    }

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-6 h4">Account Balance:</div>
        <div className="col-6 h4">Crypto Exchange Value</div>
      </div>
      <div className="row">
        <div className="container text-success col-6">
          US Dollars: ${accountState}
        </div>
        <div className="col-6">
          <CryptoValue bitcoin={bitcoin} ethereum={ethereum}></CryptoValue>
        </div>
      </div>

      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>

      <ATMDeposit
        onChange={handleChange}
        isDeposit={isDeposit}
        atmMode={atmMode}
        isValid={validTransaction}
      ></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
